package com.latch.service.feign;

import java.util.Collection;
import java.util.Optional;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.data.repository.query.Param;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.latch.domain.ReviewDTO;
import com.latch.domain.ReviewDelayDTO;
import com.latch.domain.ReviewRequestDTO;
import com.latch.service.feign.fallback.ReviewServiceClientFallbackHandler;

@FeignClient(name = "review-service", decode404 = true, fallback = ReviewServiceClientFallbackHandler.class)
public interface ReviewServiceClient {

	// Review Queries
	@RequestMapping(value = "/reviews", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	ReviewDTO createReview(@RequestBody ReviewDTO review);
	
	@RequestMapping(value = "/reviews/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	ReviewDTO updateReview(@PathVariable("id") String id, @RequestBody ReviewDTO review);
	
	@RequestMapping(value = "/reviews/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	ReviewDTO getReview(@PathVariable("id") String id);
	
	@RequestMapping(value = "/reviews/search/findByReviewedUserId", method = RequestMethod.GET, produces = "application/hal+json")
	PagedResources<ReviewDTO> findByReviewedUserId(@RequestParam("reviewedUserId") String reviewedUserId, @RequestParam("page") int page,
			@RequestParam("size") int size, @RequestParam("sort") String sort);

	@RequestMapping(value = "/reviews/search/findByReviewedUserIdAndCompleteTimeIsNotNull", method = RequestMethod.GET, produces = "application/hal+json")
	PagedResources<ReviewDTO> findByReviewedUserIdAndCompleteTimeIsNotNull(@RequestParam("reviewedUserId") String reviewedUserId, @RequestParam("page") int page,
			@RequestParam("size") int size, @RequestParam("sort") String sort);

	@RequestMapping(value = "/reviews/search/findByReviewerUserId", method = RequestMethod.GET, produces = "application/hal+json")
	PagedResources<ReviewDTO> findByReviewerUserId(@Param("reviewerUserId") String reviewerUserId, @RequestParam("page") int page,
			@RequestParam("size") int size, @RequestParam("sort") String sort);

	
	
	// ReviewRequest Delay queries
	@RequestMapping(value = "/reviewDelays/search/findMaxDelayDaysByProfessionId")
	Integer findMaxDelayDaysByProfessionId(@RequestParam("professionId") String professionId);
	
	@RequestMapping(value = "/reviewDelays/search/findMaxDelayDaysByProfessionIdAndNetworkIdIn")
	Integer findMaxDelayDaysByProfessionIdAndNetworkIdIn(@RequestParam("professionId") String professionId, @RequestParam("networkIds") Collection<String> networkIds);
	
	@RequestMapping(value = "/reviewDelays/search/findFirst1ByProfessionIdAndNetworkIdInOrderByDelayDaysDesc")
	Optional<ReviewDelayDTO> findFirst1ByProfessionIdAndNetworkIdInOrderByDelayDaysDesc(
			@RequestParam("professionId") String professionId, @RequestParam("networkIds") Collection<String> networkIds);

	
	// Review Request(schedule) Queries
	@RequestMapping(value = "/reviewRequests", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	ReviewRequestDTO createReviewRequest(@RequestBody ReviewRequestDTO reviewRequest);
	
	@RequestMapping(value = "reviewRequests/api/deleteByReviewId", method = RequestMethod.DELETE)
	Long deleteReviewRequestsByReviewId(@RequestParam("reviewId") String reviewId);
	
	@RequestMapping(value = "/reviewRequests/search/findByReviewId", method = RequestMethod.GET, produces = "application/hal+json")
	PagedResources<ReviewRequestDTO> findReviewRequestsByReviewId(@RequestParam("reviewId") String reviewId, @RequestParam("page") int page,
			@RequestParam("size") int size, @RequestParam("sort") String sort);

}