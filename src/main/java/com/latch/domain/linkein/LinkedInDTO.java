package com.latch.domain.linkein;

/**
 * Created by Hector on 3/6/2016.
 */

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.latch.domain.AbstractLatchSocialDTO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class LinkedInDTO extends AbstractLatchSocialDTO {
	
	private String userId;
	
    private String access_token;
    private String expires_in;
}
