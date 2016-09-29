package com.latch.domain;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain=true)
@JsonIgnoreProperties(value={"hibernateLazyInitializer", "handler"}, ignoreUnknown=true)
public class UserNoteDTO implements Serializable {

	private static final long serialVersionUID = 6389496690795225432L;

	private String id;
	private String ownerUserId;
	private String targetUserId;
	private String content;
	private String profession;
	private String businessName;
	private String businessAddress1;
	private String businessAddress2;
	private String businessCity;
	private String businessState;
	private String businessCounty;
	private String businessZip;
	private String mobilePhone;
	private String faxNumber;
	private LocalDateTime lastModifiedTime;

}
