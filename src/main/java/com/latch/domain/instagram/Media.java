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
public class Media  {
    private Object attribution;
    private List<Object> tags = new ArrayList<>();
    private String type;
    private Location location;
    private Comments comments;
    private String filter;
    private String created_time;
    private String link;
    private Likes likes;
    private Images images;
    private Videos videos;
    private List<UserPhotoTag> users_in_photo;
    private Caption caption;
    private Boolean user_has_liked;
    private String id;
    private User user;
}
