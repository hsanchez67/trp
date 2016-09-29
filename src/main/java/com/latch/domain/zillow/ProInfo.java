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
public class ProInfo {

    public String name;
    public String photo;
    public String profileURL;
    public String profileLink;
    public String title;
    public String businessName;
    public String address;
    public String phone;
    public String specialties;
    public List<ServiceArea> serviceAreas = new ArrayList<>();
    public String recentSaleCount;
    public String reviewRequestURL;
    public String reviewCount;
    public String avgRating;
    public String localknowledgeRating;
    public String processexpertiseRating;
    public String responsivenessRating;
    public String negotiationskillsRating;

}
