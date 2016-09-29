package com.latch.domain.instagram;

/**
 * Created by Hector on 3/16/2016.
 */

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Self {
    private Meta meta;
    private User data;
}
