package com.latch.domain.instagram;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.latch.domain.AbstractLatchSocialDTO;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Hector on 3/15/2016.
 */

@Data
@EqualsAndHashCode(callSuper=false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class InstagramDTO extends AbstractLatchSocialDTO {

    private String userId;
    private String access_token;
}
