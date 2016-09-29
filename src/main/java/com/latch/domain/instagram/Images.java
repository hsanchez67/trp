package com.latch.domain.instagram;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by Hector on 3/16/2016.
 */

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Images {

    public LowResolution low_resolution;
    public Thumbnail thumbnail;
    public StandardResolution standard_resolution;

}
