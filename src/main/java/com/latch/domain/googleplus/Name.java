package com.latch.domain.googleplus;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by Hector on 3/13/2016.
 */

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Name {
    public String familyName;
    public String givenName;
}
