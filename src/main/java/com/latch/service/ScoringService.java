package com.latch.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.latch.domain.ScoreDTO;
import com.latch.service.feign.ScoringServiceClient;

@Service
public class ScoringService {

	private final ScoringServiceClient scoringServiceClient;
	
	@Autowired
	public ScoringService(ScoringServiceClient scoringServiceClient) {
		this.scoringServiceClient = scoringServiceClient;
	}
	
	/**
	 * Calls the scoring-service to retrieve the users aggregate Score
	 * 
	 * @param userId
	 * @return
	 */
	public ScoreDTO getScore(String userid) {
		
		return scoringServiceClient.getScore(userid);
	}
	
	/**
	 * Queues request for backend scoring service to update the users score.
	 * 
	 * @param userid
	 * @return
	 */
	public ScoreDTO requestScoreUpdate(String userid) {
		
		return scoringServiceClient.requestScoreUpdate(userid);
	}
}
