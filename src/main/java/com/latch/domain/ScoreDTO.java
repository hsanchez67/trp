package com.latch.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" }, ignoreUnknown = true)
public class ScoreDTO {
	
	private String userId;
	private Double referrabilityScore;
	private Double financialStabilityScore;
	private Double systemUsageScore;
	
	public Double score() {
		return referrabilityScore + financialStabilityScore + systemUsageScore;
	}
}
