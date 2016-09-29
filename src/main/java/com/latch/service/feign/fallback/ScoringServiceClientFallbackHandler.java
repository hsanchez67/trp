package com.latch.service.feign.fallback;

import com.latch.domain.ScoreDTO;
import com.latch.service.feign.ScoringServiceClient;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ScoringServiceClientFallbackHandler implements ScoringServiceClient {

	@Override
	public ScoreDTO requestScoreUpdate(String userid) {
		log("requestScoreUpdate", new Object[] {userid});
		return new ScoreDTO().setUserId(userid).setReferrabilityScore(0.0).setFinancialStabilityScore(0.0).setSystemUsageScore(0.0);
	}
	
	@Override
	public ScoreDTO getScore(String userid) {
		log("getScore", new Object[] {userid});
		return new ScoreDTO().setUserId(userid).setReferrabilityScore(0.0).setFinancialStabilityScore(0.0).setSystemUsageScore(0.0);
	}
		
	private void log(String method, Object[] args) {
		log.warn("Exception calling scoring-service.{}({}) - circuit open", method, args);
	}
}
