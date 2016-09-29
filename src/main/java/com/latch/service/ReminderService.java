package com.latch.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.latch.service.feign.ReminderServiceClient;

@Service
public class ReminderService {
	
	private final ReminderServiceClient reminderServiceClient;
	
	@Autowired
	public ReminderService(ReminderServiceClient reminderServiceClient) {
		this.reminderServiceClient = reminderServiceClient;
	}

	public void scheduleActionReminder(String actionId) {
		reminderServiceClient.scheduleActionReminder(actionId);
	}
	
	public void unscheduleActionReminder(String actionId) {
		reminderServiceClient.unscheduleActionReminder(actionId);
	}

	public void scheduleReciprocationReminder(String referralId) {
		reminderServiceClient.scheduleReciprocationReminder(referralId);
	}
	
	public void unscheduleReciprocationReminder(String fromUserId, String toUserId) {
		reminderServiceClient.unscheduleReciprocationReminder(fromUserId, toUserId);
	}
	
}

