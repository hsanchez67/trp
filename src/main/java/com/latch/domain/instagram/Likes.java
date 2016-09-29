package com.latch.domain.instagram;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by Hector on 3/16/2016.
 */

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Likes {

    public Integer count;
}
