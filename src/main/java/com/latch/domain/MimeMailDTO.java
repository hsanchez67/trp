package com.latch.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * Object used to construct a Multipart/Mime Email message to be delivered through the mail-service
 * 
 * attachedAssetIds and inlineAssesIds refer to the ids of RemoteFileObjects stored in the fs-file-service
 * 
 * @author Brett
 *
 */
@Data
@ToString(callSuper=false)
@EqualsAndHashCode(callSuper=true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class MimeMailDTO extends SimpleMailDTO {

	private static final long serialVersionUID = -1748966832796099696L;

	private String htmlText,
					watchHtmlText;
	
	private String[] attachedAssetIds
					, inlineAssetIds;
	
}
