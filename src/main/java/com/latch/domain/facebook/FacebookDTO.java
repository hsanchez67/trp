package com.latch.domain.facebook;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.latch.domain.AbstractLatchSocialDTO;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Hector on 3/18/2016.
 */

@Data
@EqualsAndHashCode(callSuper=false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class FacebookDTO extends AbstractLatchSocialDTO {

    private String userId;

    public String facebookPageUrl;
    public Long facebookAppId;
}
