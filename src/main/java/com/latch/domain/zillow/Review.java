package com.latch.domain.zillow;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by Hector on 3/3/2016.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Review {

    public String reviewer;
    public String reviewerLink;
    public String reviewURL;
    public String reviewDate;
    public String reviewSummary;
    public String rating;
    public String localknowledgeRating;
    public String processexpertiseRating;
    public String responsivenessRating;
    public String negotiationskillsRating;
    public String description;

}
