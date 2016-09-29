package com.latch.domain.instagram;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Hector on 3/16/2016.
 */

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Videos {
    public LowResolution low_resolution;
    public StandardResolution standard_resolution;
    public Comments comments;
    public Caption caption;
    public Likes likes;
    public String link;
    public String created_time;
    public Images images;
    public String type;
    public List<UserPhotoTag> users_in_photo;
    public String filter;
    public List<Object> tags = new ArrayList<>();
    public String id;
    public User user;
    public Location location;
}
