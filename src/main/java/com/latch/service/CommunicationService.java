package com.latch.service;

import java.util.Arrays;
import java.util.Collection;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.PagedResources;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.latch.domain.CommunicationDTO;
import com.latch.logging.LogEvent;
import com.latch.service.feign.CommunicationServiceClient;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CommunicationService {
	
	private final CommunicationServiceClient communicationServiceClient;
	
	@Autowired
	public CommunicationService(CommunicationServiceClient emailServiceClient) {
		this.communicationServiceClient = emailServiceClient;
	}

	public void sendCommunication(CommunicationDTO... dtos) {
		Assert.notNull(dtos, "CommunicationDTOs required");
		CommunicationDTO[] validatedMessages = Arrays.asList(dtos).stream()
				.filter( a -> a != null )
				.map( a -> validateSend(a) )
				.toArray( size -> new CommunicationDTO[size] );
		new LogEvent()
			.addProperty("event", "sendCommunication")
			.addProperty("messages", validatedMessages)
			.writeLogInfo(log);
		communicationServiceClient.send(validatedMessages);
	}

	public CommunicationDTO createCommunication(CommunicationDTO dto) {
		Assert.notNull(dto, "CommunicationDTO required");
		CommunicationDTO validatedMessage = validateCreate(dto);
		return communicationServiceClient.create(validatedMessage);
	}
	
	public PagedResources<CommunicationDTO> getCommunicationsTo(String userid, String transactionType, int page, int size, String sort) {
		Assert.hasText(userid, "userid required");
		Assert.hasText(transactionType, "transactionType required");
		return communicationServiceClient.getMessagesTo(userid, transactionType, page, size, sort);
	}
	
	public PagedResources<CommunicationDTO> getCommunicationsFrom(String userid, String transactionType, int page, int size, String sort) {
		Assert.hasText(userid, "userid required");
		Assert.hasText(transactionType, "transactionType required");
		return communicationServiceClient.getMessagesFrom(userid, transactionType, page, size, sort);
	}
	
	public CommunicationDTO getCommunicationsById(String messageid) {
		Assert.hasText(messageid, "messageid required");
		return communicationServiceClient.getMessageById(messageid);
	}

	public PagedResources<CommunicationDTO> findByToUserIdAndTransactionType(String toUserid, String transactionType, int page, int size, String sort) {
		Assert.hasText(toUserid, "toUserid required");
		Assert.hasText(transactionType, "transactionType required");
		return communicationServiceClient.findByToUserIdAndTransactionType(toUserid, transactionType, page, size, sort);
	}

	public PagedResources<CommunicationDTO> findByToUserIdAndStatusIn(String toUserid, Collection<String> status, int page, int size, String sort) {
		Assert.hasText(toUserid, "toUserid required");
		Assert.notEmpty(status, "status required");
		return communicationServiceClient.findByToUserIdAndStatusIn(toUserid, status, page, size, sort);
	}

	public PagedResources<CommunicationDTO> findByToUserIdAndStatusNotIn(String toUserid, Collection<String> status, int page, int size, String sort) {
		Assert.hasText(toUserid, "toUserid required");
		Assert.notEmpty(status, "status required");
		return communicationServiceClient.findByToUserIdAndStatusNotIn(toUserid, status, page, size, sort);
	}

	public PagedResources<CommunicationDTO> findByFromUserIdAndStatusIn(String fromUserid, Collection<String> status, int page, int size, String sort) {
		Assert.hasText(fromUserid, "fromUserid required");
		Assert.notEmpty(status, "status required");
		return communicationServiceClient.findByFromUserIdAndStatusIn(fromUserid, status, page, size, sort);
	}

	public PagedResources<CommunicationDTO> findByFromUserIdAndStatusNotIn(String fromUserid, Collection<String> status, int page, int size, String sort) {
		Assert.hasText(fromUserid, "fromUserid required");
		Assert.notEmpty(status, "status required");
		return communicationServiceClient.findByFromUserIdAndStatusNotIn(fromUserid, status, page, size, sort);
	}

	public PagedResources<CommunicationDTO> findByFromUserIdOrToUserIdOrSubjectUserIdAndStatusIn(String userid, Collection<String> status, int page, int size, String sort) {
		Assert.hasText(userid, "userid required");
		Assert.notEmpty(status, "status required");
		return communicationServiceClient.findByFromUserIdOrToUserIdOrSubjectUserIdAndStatusIn(userid, status, page, size, sort);
	}

	public PagedResources<CommunicationDTO> findByFromUserIdOrToUserIdOrSubjectUserIdAndStatusNotIn(String userid, Collection<String> status, int page, int size, String sort) {
		Assert.hasText(userid, "userid required");
		Assert.notEmpty(status, "status required");
		return communicationServiceClient.findByFromUserIdOrToUserIdOrSubjectUserIdAndStatusNotIn(userid, status, page, size, sort);
	}

	public PagedResources<CommunicationDTO> findByTwoUsersAndStatusIn(String userid1, String userid2, Collection<String> transactionType, Collection<String> status, int page, int size, String sort) {
		Assert.hasText(userid1, "userid1 required");
		Assert.hasText(userid2, "userid2 required");
		Assert.notEmpty(status, "status required");
		if(transactionType == null) transactionType = Arrays.asList("BOGUS");
		return communicationServiceClient.findByTwoUsersAndStatusIn(userid1, userid2, transactionType, status, page, size, sort);
	}

	public PagedResources<CommunicationDTO> findByTwoUsersAndStatusNotIn(String userid1, String userid2, Collection<String> transactionType, Collection<String> status, int page, int size, String sort) {
		Assert.hasText(userid1, "userid1 required");
		Assert.hasText(userid2, "userid2 required");
		Assert.notEmpty(status, "status required");
		if(transactionType == null) transactionType = Arrays.asList("BOGUS");
		return communicationServiceClient.findByTwoUsersAndStatusNotIn(userid1, userid2, transactionType, status, page, size, sort);
	}

	public void updateStatus(String messageid, String status) {
		new LogEvent()
			.addProperty("event", "updateCommunicationStatus")
			.addProperty("messageid", messageid)
			.addProperty("status", status)
			.writeLogInfo(log);
		communicationServiceClient.updateStatus(messageid, status);
	}

	public void delete(String messageid) {
		new LogEvent()
			.addProperty("event", "deleteCommunication")
			.addProperty("messageid", messageid)
			.writeLogInfo(log);
		communicationServiceClient.delete(messageid);
	}

	/*
	 * common validation
	 */
	private CommunicationDTO validateCreate(CommunicationDTO dto) throws IllegalArgumentException {
		
		Assert.hasText(dto.getToUserId(), "Communication.toUserId required");
		Assert.hasText(dto.getFromUserId(), "Communication.fromUserId required");
		
		return dto;
	}

	private CommunicationDTO validateSend(CommunicationDTO dto) throws IllegalArgumentException {

		validateCreate(dto);
		if(StringUtils.isBlank(dto.getSubject()) && StringUtils.isBlank(dto.getText()) && StringUtils.isBlank(dto.getHtmlText()))
			throw new IllegalArgumentException("Email requires Subject or Text or HtmlText");
		
		return dto;
	}
}

