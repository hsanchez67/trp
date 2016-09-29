package com.latch;

import java.util.Collection;

import com.latch.domain.UserDTO;

/**
 * Created by Hector on 12/10/2015.
 */
public class Markers {

    private Collection<UserDTO> markers;
    private double lat;
    private double lng;

    public Markers() {}

    public Collection<UserDTO> getMarkers() {
        return markers;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public void setMarkers(Collection<UserDTO> markers) {
        this.markers = markers;
    }

    @Override
    public String toString() {
        return "Markers{" +
                "markers=" + markers +
                ", lat=" + lat +
                ", lng=" + lng +
                '}';
    }
}
