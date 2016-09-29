package com.latch.domain.linkein;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by Hector on 3/9/2016.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class LinkedInProfile {
    private String id;
    private String emailAddress;
    private String headline;
    private String summary;
    private String positions;
    private String firstName;
    private String lastName;
    private String formattedName;
    private String pictureUrl;
    private int numConnections;
    private String publicProfileUrl;
    private Location location;
    private String loc;
    private String country;

}
