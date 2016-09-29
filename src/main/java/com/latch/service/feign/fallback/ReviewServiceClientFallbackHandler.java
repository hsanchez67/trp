package com.latch.service.feign.fallback;

import java.util.Collection;
import java.util.Optional;

import org.springframework.hateoas.PagedResources;

import com.latch.domain.ReviewDTO;
import com.latch.domain.ReviewDelayDTO;
import com.latch.domain.ReviewRequestDTO;
import com.latch.service.feign.ReviewServiceClient;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ReviewServiceClientFallbackHandler implements ReviewServiceClient {

	@Override
	public ReviewDTO createReview(ReviewDTO review) {
		log.warn("Exception calling review-service.createReview({}) - circuit open", review);
		return null;
	}
	@Override
	public Integer findMaxDelayDaysByProfessionId(String professionId) {
		log.warn("Exception calling review-service.findMaxDelayDaysByProfessionId({}) - circuit open", professionId);
		return null;
	}
	@Override
	public Integer findMaxDelayDaysByProfessionIdAndNetworkIdIn(String professionId,
			Collection<String> networkIds) {
		log.warn("Exception calling review-service.findMaxDelayDaysByProfessionIdAndNetworkIdIn({}, {}) - circuit open", professionId, networkIds);
		return null;
	}

	@Override
	public Optional<ReviewDelayDTO> findFirst1ByProfessionIdAndNetworkIdInOrderByDelayDaysDesc(String professionId,
			Collection<String> networkIds) {
		log.warn("Exception calling review-service.findFirst1ByProfessionIdAndNetworkIdInOrderByDelayDaysDesc({}, {}) - circuit open", professionId, networkIds);
		log.info("#### Darned Bugs!");
		return null;
	}
	
	@Override
	public ReviewRequestDTO createReviewRequest(ReviewRequestDTO reviewRequest) {
		log.warn("Exception calling review-service.createReviewRequest({}) - circuit open", reviewRequest);
		return null;
	}
	
	@Override
	public Long deleteReviewRequestsByReviewId(String reviewId) {
		log.warn("Exception calling review-service.deleteReviewRequestsByReviewId({}) - circuit open", reviewId);
		return null;
	}
	
	@Override
	public PagedResources<ReviewRequestDTO> findReviewRequestsByReviewId(String reviewId, int page, int size,
			String sort) {
		log.warn("Exception calling review-service.findReviewRequestsByReviewId({}, {}, {}, {}) - circuit open", reviewId, page, size, sort);
		return null;
	}
	
	@Override
	public ReviewDTO updateReview(String id, ReviewDTO review) {
		log.warn("Exception calling review-service.updateReview({}) - circuit open", review);
		return null;
	}
	
	@Override
	public PagedResources<ReviewDTO> findByReviewedUserId(String reviewedUserId, int page, int size, String sort) {
		log.warn("Exception calling review-service.findByReviewedUserId({}, {}, {}, {}) - circuit open", reviewedUserId, page, size, sort);
		return null;
	}
	
	@Override
	public PagedResources<ReviewDTO> findByReviewedUserIdAndCompleteTimeIsNotNull(String reviewedUserId, int page,
			int size, String sort) {
		log.warn("Exception calling review-service.findByReviewedUserIdAndCompleteTimeIsNotNull({}, {}, {}, {}) - circuit open", reviewedUserId, page, size, sort);
		return null;
	}
	
	@Override
	public PagedResources<ReviewDTO> findByReviewerUserId(String reviewerUserId, int page, int size, String sort) {
		log.warn("Exception calling review-service.findByReviewerUserId({}, {}, {}, {}) - circuit open", reviewerUserId, page, size, sort);
		return null;
	}
	
	@Override
	public ReviewDTO getReview(String id) {
		log.warn("Exception calling review-service.getReview({}) - circuit open", id);
		return null;
	}
}
