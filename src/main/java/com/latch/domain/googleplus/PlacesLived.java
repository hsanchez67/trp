package com.latch.domain.googleplus;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by Hector on 3/13/2016.
 */

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PlacesLived {
    public String value;
    public Boolean primary;
}
