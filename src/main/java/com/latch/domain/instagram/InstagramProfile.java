package com.latch.domain.instagram;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by Hector on 3/17/2016.
 */

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class InstagramProfile {

    private User user;
    private Recent recent;
}
