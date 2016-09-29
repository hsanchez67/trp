package com.latch.domain.googleplus;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.latch.domain.AbstractLatchSocialDTO;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Hector on 3/13/2016.
 */

@Data
@EqualsAndHashCode(callSuper=false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class GooglePlusDTO extends AbstractLatchSocialDTO {
    private String userId;

    public String googlePlusUserId;
}
