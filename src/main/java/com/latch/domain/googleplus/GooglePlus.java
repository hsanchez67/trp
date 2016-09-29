package com.latch.domain.googleplus;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Hector on 3/13/2016.
 */

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GooglePlus {
    public String kind;
    public String etag;
    public String occupation;
    public String gender;
    public List<Url> urls = new ArrayList<>();
    public String objectType;
    public String id;
    public String displayName;
    public Name name;
    public String aboutMe;
    public String tagline;
    public String url;
    public Image image;
    public List<Organization> organizations = new ArrayList<Organization>();
    public List<PlacesLived> placesLived = new ArrayList<PlacesLived>();
    public Boolean isPlusUser;
    public Integer circledByCount;
    public Boolean verified;
    public Cover cover;
}
