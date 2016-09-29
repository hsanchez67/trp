package com.latch.domain.googleplus;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by Hector on 3/18/2016.
 */

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CoverPhoto {
    private String url;
    private int height;
    private int width;
}
