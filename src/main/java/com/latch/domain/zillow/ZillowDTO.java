package com.latch.domain.zillow;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.latch.domain.AbstractLatchSocialDTO;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Hector on 3/3/2016.
 */

@Data
@EqualsAndHashCode(callSuper=false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ZillowDTO extends AbstractLatchSocialDTO {

	private String userId;
	
    public String screenName;

}
