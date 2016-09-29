package com.latch.domain.zillow;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by Hector on 3/3/2016.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Results {

    public String screenname;
    public String count;
    public ProInfo proInfo;
    public ProReviews proReviews;

}
