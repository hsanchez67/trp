package com.latch.service.feign;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.latch.domain.ScoreDTO;
import com.latch.service.feign.fallback.ScoringServiceClientFallbackHandler;

@FeignClient(name = "scoring-service", decode404 = true, fallback = ScoringServiceClientFallbackHandler.class)
public interface ScoringServiceClient {

	@RequestMapping(value = "/score/{userid}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	ScoreDTO getScore(@PathVariable("userid") String userid);

	@RequestMapping(value = "/score/{userid}/calc", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	ScoreDTO requestScoreUpdate(@PathVariable("userid") String userid);

}