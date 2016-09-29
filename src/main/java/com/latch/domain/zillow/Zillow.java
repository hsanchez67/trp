package com.latch.domain.zillow;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by Hector on 3/7/2016.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Zillow {
    public Message message;
    public Response response;

}
