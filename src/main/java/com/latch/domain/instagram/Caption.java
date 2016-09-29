package com.latch.domain.instagram;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by Hector on 3/16/2016.
 */

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Caption {
    public String created_time;
    public String text;
    public From from;
    public String id;
}
