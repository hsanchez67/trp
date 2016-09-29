package com.latch.domain.googleplus;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by Hector on 3/18/2016.
 */

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Cover {
    private String layout;
    private CoverPhoto coverPhoto;
    private CoverInfo coverInfo;
}
