package com.latch.domain.zillow;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Hector on 3/3/2016.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProReviews {

    public List<Review> review = new ArrayList<>();

}
