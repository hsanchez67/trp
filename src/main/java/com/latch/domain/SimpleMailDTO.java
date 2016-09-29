package com.latch.domain;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
 * Object used to construct a Simple plain text Email message to be delivered through the mail-service
 * 
 * @author Brett
 *
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SimpleMailDTO implements Serializable {

	private static final long serialVersionUID = -6282022238925106775L;

	private String from
				, replyTo
				, subject
				, text;

	private String[] to
					, cc
					, bcc;
	
}
