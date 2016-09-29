package com.latch.domain.instagram;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by Hector on 3/15/2016.
 */


@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {
    public String id;
    public String username;
    public String full_name;
    public String profile_picture;
    public String bio;
    public String website;
    public Counts counts;
}
