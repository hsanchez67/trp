package com.latch;

/**
 * Created by Hector on 12/10/2015.
 */
public class SearchTerm {
    private String name;
    private String profession;
    private String city;
    private String state;

    public SearchTerm() {}

    public SearchTerm(String name, String profession, String city, String state) {
        this.name = name;
        this.profession = profession;
        this.city = city;
        this.state = state;
    }

    public String getName() {
        return name;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Override
    public String toString() {
        return "SearchTerm{" +
                "name='" + name + '\'' +
                ", profession='" + profession + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                '}';
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setName(String name) {

        this.name = name;
    }


}
