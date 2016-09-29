package com.latch.service.feign.fallback;

import org.springframework.hateoas.Resource;

import com.latch.service.feign.ReminderServiceClient;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ReminderServiceClientFallbackHandler implements ReminderServiceClient {

	@Override
	public Resource<String> scheduleActionReminder(String actionId) {
		log("scheduleActionReminder", new Object[] {actionId});
		return null;
	}
	
	@Override
	public Resource<String> unscheduleActionReminder(String actionId) {
		log("unscheduleActionReminder", new Object[] {actionId});
		return null;
	}
	
	
	@Override
	public Resource<String> scheduleReciprocationReminder(String referralId) {
		log("scheduleReciprocationReminder", new Object[] {referralId});
		return null;
	}
	
	@Override
	public Resource<String> unscheduleReciprocationReminder(String fromUserId, String toUserId) {
		log("unscheduleReciprocationReminder", new Object[] {fromUserId, toUserId});
		return null;
	}
	
	private void log(String method, Object[] args) {
		log.warn("Exception calling profession-service.{}({}) - circuit open", method, args);
	}
}
