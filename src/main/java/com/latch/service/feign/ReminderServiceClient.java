package com.latch.service.feign;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.latch.service.feign.fallback.ReminderServiceClientFallbackHandler;

@FeignClient(name = "communication-service", decode404 = true, fallback = ReminderServiceClientFallbackHandler.class)
public interface ReminderServiceClient {

	@RequestMapping(value = "/reminders/scheduleReciprocationReminder", method = RequestMethod.POST)
	Resource<String> scheduleReciprocationReminder(@RequestParam("referralId") String referralId);

	@RequestMapping(value = "/reminders/unscheduleReciprocationReminder", method = RequestMethod.DELETE)
	Resource<String> unscheduleReciprocationReminder(@RequestParam("fromUserId") String fromUserId, @RequestParam("toUserId") String toUserId);


	@RequestMapping(value = "/reminders/scheduleActionReminder", method = RequestMethod.POST)
	Resource<String> scheduleActionReminder(@RequestParam("actionId") String actionId);

	@RequestMapping(value = "/reminders/unscheduleActionReminder", method = RequestMethod.DELETE)
	Resource<String> unscheduleActionReminder(@RequestParam("actionId") String actionId);
}
