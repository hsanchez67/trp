package com.latch.service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.PagedResources;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.latch.domain.NetworkDTO;
import com.latch.domain.ReviewDTO;
import com.latch.domain.ReviewRequestDTO;
import com.latch.domain.UserDTO;
import com.latch.logging.LogEvent;
import com.latch.service.feign.ReviewServiceClient;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ReviewService {

	private final CommunicationService communicationService;
	private final ReviewServiceClient reviewServiceClient;
	private final UserService userService;
	
	@Autowired
	public ReviewService(ReviewServiceClient reviewServiceClient, UserService userService,
			CommunicationService communicationService) {
		this.reviewServiceClient = reviewServiceClient;
		this.userService = userService;
		this.communicationService = communicationService;
	}
	
	/**
	 * Find a single Review by Review.id
	 * 
	 * @param id
	 * @return
	 */
	public ReviewDTO getReview(String id) {
		Assert.isTrue(!StringUtils.isEmpty(id), "id required");
		return reviewServiceClient.getReview(id);
	}

	/**
	 * Find reviews by the User who submitted the Review
	 * 
	 * @param reviewerUserId
	 * @param page
	 * @param size
	 * @param sort
	 * @return
	 */
	public PagedResources<ReviewDTO> findByReviewerUserId(String reviewerUserId, int page, int size, String sort) {
		Assert.isTrue(!StringUtils.isEmpty(reviewerUserId), "reviewerUserId required");
		return reviewServiceClient.findByReviewerUserId(reviewerUserId, page, size, sort);
	}

	/**
	 * Find reviews by the User who was reviewed 
	 * 
	 * @param reviewedUserId
	 * @param page
	 * @param size
	 * @param sort
	 * @return
	 */
	public PagedResources<ReviewDTO> findByReviewedUserId(String reviewedUserId, int page, int size, String sort) {
		Assert.isTrue(!StringUtils.isEmpty(reviewedUserId), "reviewedUserId required");
		return reviewServiceClient.findByReviewedUserId(reviewedUserId, page, size, sort);
	}

	/**
	 * Find reviews by the User who was reviewed 
	 * 
	 * @param reviewedUserId
	 * @param page
	 * @param size
	 * @param sort
	 * @return
	 */
	public PagedResources<ReviewDTO> findCompletedByReviewedUserId(String reviewedUserId, int page, int size, String sort) {
		Assert.isTrue(!StringUtils.isEmpty(reviewedUserId), "reviewedUserId required");
		return reviewServiceClient.findByReviewedUserIdAndCompleteTimeIsNotNull(reviewedUserId, page, size, sort);
	}

	/**
	 * Submit a completed Review
	 * 
	 * @param review
	 */
	public void submitReview(ReviewDTO review) {
		
		Assert.hasText(review.getId(), "id required");
		Assert.hasText(review.getReviewedUserId(), "reviewedUserId required");
		Assert.hasText(review.getReviewedUserRole(), "reviewedUserRole required");
		Assert.hasText(review.getReviewerUserId(), "reviewerUserId required");
		Assert.hasText(review.getReviewerUserRole(), "reviewerUserRole required");
		review.setCompleteTime(Timestamp.valueOf(LocalDateTime.now()));
		
		communicationService.updateStatus(review.getCommunicationId(), "Reviewed");
		new LogEvent()
			.addProperty("event", "updateCommunicationStatus")
			.addProperty("communicationId", review.getCommunicationId())
			.addProperty("status", "Reviewed")
			.writeLogInfo(log);
		
		reviewServiceClient.updateReview(review.getId(), review);
		new LogEvent()
			.addProperty("event", "submitReview")
			.addProperty("review", review)
			.writeLogInfo(log);

		reviewServiceClient.deleteReviewRequestsByReviewId(review.getId());
		new LogEvent()
			.addProperty("event", "deleteReviewRequest")
			.addProperty("reviewId", review.getId())
			.writeLogInfo(log);
		
		// TODO: send message to scoring service to apply review results to score
	}
	
	/**
	 * Schedule a ReviewRequest
	 * 		Store a Review and optionally supply the date to communicate
	 * 		If no mailDate supplied, the mail date will be determined based on 
	 * 			the Providers Profession and Network affiliations.
	 * 
	 * @param review 	the Review object
	 * @param mailDate	(optional) mail date.
	 */
	public ReviewRequestDTO requestReview(@NotNull ReviewDTO review, LocalDate mailDate) {

		try {
			// ensure that the review is valid
			review = validateNewReview(review);
	
			// ensure that the reviewedUser exists
			final String reviewedUserId = review.getReviewedUserId();
			UserDTO reviewedUser = userService.getUserById(reviewedUserId)
					.orElseThrow(() -> new IllegalArgumentException("Reviewed User not found " + reviewedUserId));
	
			// TODO: create a sane Exception for failure to create
			ReviewDTO savedReview = reviewServiceClient.createReview(review);
			if(savedReview == null) {
				throw new IllegalArgumentException("failed to create Review");
			}
			new LogEvent()
				.addProperty("event", "createReview")
				.addProperty("review", savedReview)
				.writeLogInfo(log);
			
			// schedule reviewRequest
			if(mailDate == null) {
				Collection<NetworkDTO> networks = userService.getNetworks(reviewedUser).getContent();
				List<String> networkIds = networks.stream()
					.map(e -> e.getId().toString())
					.collect(Collectors.toList());
				mailDate = LocalDate.now().plusDays(getDelay(reviewedUser.getProfession(), networkIds));
			}
			ReviewRequestDTO reviewRequest = new ReviewRequestDTO()
					.setReviewId(savedReview.getId())
					.setDateToSend(mailDate);
			reviewRequest = reviewServiceClient.createReviewRequest(reviewRequest);
			new LogEvent()
				.addProperty("event", "createReviewRequest")
				.addProperty("reviewRequest", reviewRequest)
				.writeLogInfo(log);
			return reviewRequest;
		} catch(Exception e) {
			new LogEvent()
				.addProperty("event", "requestReview")
				.addProperty("status", "failed")
				.addProperty("reason", e.getMessage())
				.writeLogInfo(log);
			throw e;
		}
	}
	
	/**
	 * Return the ReviewRequest Delay Days as:
	 * 		Max(delayDays) for professionId and networkId
	 * 	or	Max(delayDays) for professionId and networkId = ''
	 *  or  delayDays for professionId = '' and networkId = '' (global db default)
	 *  or  30 (If for some reason the db table doesn't have the global default defined).
	 *  
	 * @param professionId	- ProfessionId of the Professional doing the work
	 * @param networkIds - Comma-separated list of networks for the Professional doing the work
	 * 
	 * @return
	 */
	private Integer getDelay(String professionId, Collection<String> networkIds) {
		Integer delay = null;
		if (networkIds != null && networkIds.size() > 0) {
			delay = reviewServiceClient.findMaxDelayDaysByProfessionIdAndNetworkIdIn(professionId, networkIds);
		}
		if(delay == null) {
			delay = reviewServiceClient.findMaxDelayDaysByProfessionId(professionId);
			if(delay == null) {
				delay = reviewServiceClient.findMaxDelayDaysByProfessionId("");
				if(delay == null) {
					delay = 30;
				}
			}
		}
		return delay;
	}
	
	private ReviewDTO validateNewReview(ReviewDTO review) {

		Assert.isTrue(StringUtils.isEmpty(review.getId()), "id should be blank");
		Assert.hasText(review.getReviewedUserId(), "reviewedUserId required");
		Assert.hasText(review.getReviewedUserRole(), "reviewedUserRole required");
		Assert.hasText(review.getReviewerUserId(), "reviewerUserId required");
		Assert.hasText(review.getReviewerUserRole(), "reviewerUserRole required");
		// ensure non-definable review properties are null
		review.setCommunicationId(null)
			.setRequestCount(null)
			.setRequestedTime(null)
			.setCompleteTime(null)
			.setContacted(null)
			.setDidBusiness(null)
			.setDoBusinessAgain(null)
			.setNoFutureBusinessReason(null)
			.setNps(null)
			.setOverallQualityOfService(null)
			.setTimelinessOfService(null)
			.setOverallRating(null)
			.setReviewComments(null);
		
		return review;
	}
}
