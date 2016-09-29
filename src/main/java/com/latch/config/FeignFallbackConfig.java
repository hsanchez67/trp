package com.latch.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.latch.service.feign.fallback.CommunicationServiceClientFallbackHandler;
import com.latch.service.feign.fallback.NetworkServiceClientFallbackHandler;
import com.latch.service.feign.fallback.ProfessionServiceClientFallbackHandler;
import com.latch.service.feign.fallback.ReminderServiceClientFallbackHandler;
import com.latch.service.feign.fallback.RemoteFileServiceClientFallbackHandler;
import com.latch.service.feign.fallback.ReviewServiceClientFallbackHandler;
import com.latch.service.feign.fallback.ScoringServiceClientFallbackHandler;
import com.latch.service.feign.fallback.SocialServiceClientFallbackHandler;
import com.latch.service.feign.fallback.TagServiceClientFallbackHandler;
import com.latch.service.feign.fallback.UserNoteServiceClientFallbackHandler;
import com.latch.service.feign.fallback.UserServiceClientFallbackHandler;

@Configuration
public class FeignFallbackConfig {
	
	@Bean
	CommunicationServiceClientFallbackHandler communicationServiceClientFallbackHandler() {
		return new CommunicationServiceClientFallbackHandler();
	}
	
	@Bean
	NetworkServiceClientFallbackHandler networkServiceClientFallbackHandler() {
		return new NetworkServiceClientFallbackHandler();
	}
	
	@Bean
	ProfessionServiceClientFallbackHandler professionServiceClientFallbackHandler() {
		return new ProfessionServiceClientFallbackHandler();
	}

	@Bean
	RemoteFileServiceClientFallbackHandler RemoteFileServiceClientFallbackHandler() {
		return new RemoteFileServiceClientFallbackHandler();
	}

	@Bean
	ReviewServiceClientFallbackHandler reviewServiceClientFallbackHandler() {
		return new ReviewServiceClientFallbackHandler();
	}
	
	@Bean
	SocialServiceClientFallbackHandler socialServiceClientFallbackHandler() {
		return new SocialServiceClientFallbackHandler();
	}
	
	@Bean
	TagServiceClientFallbackHandler tagServiceClientFallbackHandler() {
		return new TagServiceClientFallbackHandler();
	}
	
	@Bean
	UserNoteServiceClientFallbackHandler userNoteServiceClientFallbackHandler() {
		return new UserNoteServiceClientFallbackHandler();
	}
	
	@Bean
	UserServiceClientFallbackHandler userServiceClientFallbackHandler() {
		return new UserServiceClientFallbackHandler();
	}
	
	@Bean
	ScoringServiceClientFallbackHandler scoringServiceClientFallbackHandler() {
		return new ScoringServiceClientFallbackHandler();
	}
	
	@Bean
	ReminderServiceClientFallbackHandler reminderServiceClientFallbackHandler() {
		return new ReminderServiceClientFallbackHandler();
	}
}
