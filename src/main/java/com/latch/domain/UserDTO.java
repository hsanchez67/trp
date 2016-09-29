package com.latch.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.Date;

//Client side DTO for the translation
@Data
@NoArgsConstructor
@Accessors(chain = true)
@ToString(exclude = "password")
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDTO {
	
	private String id;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String acceptTerms;
	private String avatar;
	private String profession;
	private String businessName;
	private String businessAddress1;
	private String businessAddress2;
	private String businessCity;
	private String businessState;
	private String businessCounty;
	private String businessZip;
	private String address1;
	private String address2;
	private String city;
	private String state;
	private String county;
	private String zip;
	private String score;
	private double lat;
	private double lng;
	private String[] roles;
	private String description;
	private String leadParagraph;
	private String profileName;
	private String phone;
	private String mobilePhone;
	private String faxNumber;
	private String businessPhone;
	private String rtLicense;
	private Date rtLicenseExpiration;
	private String defaultGroup;
	private Boolean visible;
	private Boolean authenticated;
	private String invitation;

	public UserDTO(String firstName, String lastName, String email, String phone, String mobilePhone, String faxNumber, String password, String profession, String acceptTerms) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phone = phone;
		this.mobilePhone = mobilePhone;
		this.faxNumber = faxNumber;
		this.password = password;
		this.profession = profession;
		this.acceptTerms = acceptTerms;
	}
}