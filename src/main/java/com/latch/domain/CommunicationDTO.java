package com.latch.domain;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(value={"hibernateLazyInitializer", "handler"}, ignoreUnknown=true)
public class CommunicationDTO {
	
	private String id; // UUID
	private String status; // new, viewed, responded, deleted
	private String toContactType; // consumer, professional
	private String fromContactType; // consumer, professional
	private String transactionid; // UUID ? conversationid? threadid? 
	private String transactionType;	// Introduction, review request, review response, initial review request, etc - table driven?
	private String subjectUserId;  // User being referred/reviewed/introduced
	private String subjectUserProfession; //Primarily used for pending communications
	private Timestamp created;
	private Timestamp delivered;
	// message parts
	private String toUserId;
	private String fromUserId;
	private String groupId;  // If message is to a group
	private String subject;
	private String text;
	private String htmlText;
	private String[] attachedAssetIds;
	private String[] inlineAssetIds;  // assets img, video e.g. src="cid:id"
	private String note;
	private Boolean noteSwitch;
	private Integer attempts;
}
