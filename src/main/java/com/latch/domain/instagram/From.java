package com.latch.domain.instagram;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by Hector on 3/16/2016.
 */

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class From {

    public String username;
    public String full_name;
    public String type;
    public String id;
}
