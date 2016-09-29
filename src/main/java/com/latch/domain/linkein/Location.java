package com.latch.domain.linkein;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by Hector on 3/11/2016.
 */

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Location {
    private Country country;
    private String name;
}
