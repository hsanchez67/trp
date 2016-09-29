package com.latch.domain;

import java.sql.Timestamp;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReviewDTO {

	private String id;
	private String reviewedUserId;
	private String reviewedUserRole;	// P(rofessional) | C(onsumer)
	private String reviewerUserId;
	private String reviewerUserRole;	// P(rofessional) | C(onsumer)
	private String communicationId;
	private Integer requestCount;
	private Timestamp requestedTime;
	private Timestamp completeTime;
	private UserDTO reviewer;

	private String replacementReviewId;

	// questions
	private Boolean contacted;
	private Boolean didBusiness;
	private Boolean doBusinessAgain;
	private String noFutureBusinessReason;
	@Min(0) @Max(10)
	private Integer nps;
	@Min(0) @Max(5)
	private Integer overallQualityOfService;
	@Min(0) @Max(5)
	private Integer timelinessOfService;
	@Min(0) @Max(5)
	private Integer overallRating;

	private String reviewComments;

}
