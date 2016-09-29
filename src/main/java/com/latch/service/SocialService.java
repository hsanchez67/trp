package com.latch.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.latch.domain.LatchSocialDTO;
import com.latch.domain.facebook.FacebookDTO;
import com.latch.domain.googleplus.GooglePlusDTO;
import com.latch.domain.instagram.InstagramDTO;
import com.latch.domain.linkein.LinkedInDTO;
import com.latch.domain.zillow.ZillowDTO;
import com.latch.service.feign.SocialServiceClient;

@Service
public class SocialService {
	
	private final SocialServiceClient socialServiceClient;
	
	@Autowired
	public SocialService(SocialServiceClient socialServiceClient) {
		this.socialServiceClient = socialServiceClient;
	}


	// Zillow
	public ZillowDTO getZillow(String userId) {
		return socialServiceClient.getZillow(userId);
	}
	
	public ZillowDTO createZillow(ZillowDTO zillow) {
		validate(zillow);
		return socialServiceClient.createZillow(zillow);
	}

	public ZillowDTO updateZillow(ZillowDTO zillow) {
		validate(zillow);
		return socialServiceClient.updateZillow(zillow.getUserId(), zillow);
	}

	// Linkedin
	public LinkedInDTO getLinkedin(String userId) {
		return socialServiceClient.getLinkedin(userId);
	}
	
	public LinkedInDTO createLinkedin(LinkedInDTO linkedin) {
		validate(linkedin);
		return socialServiceClient.createLinkedin(linkedin);
	}

	public LinkedInDTO updateLinkedin(LinkedInDTO linkedin) {
		validate(linkedin);
		return socialServiceClient.updateLinkedin(linkedin.getUserId(), linkedin);
	}
	
	// Instagram
	public InstagramDTO getInstagram(String userId) {
		return socialServiceClient.getInstagram(userId);
	}
	
	public InstagramDTO createInstagram(InstagramDTO dto) {
		validate(dto);
		return socialServiceClient.createInstagram(dto);
	}

	public InstagramDTO updateLinkedin(InstagramDTO dto) {
		validate(dto);
		return socialServiceClient.updateInstagram(dto.getUserId(), dto);
	}
	
	// Facebook
	public FacebookDTO getFacebook(String userId) {
		return socialServiceClient.getFacebook(userId);
	}
	
	public FacebookDTO createFacebook(FacebookDTO dto) {
		validate(dto);
		return socialServiceClient.createFacebook(dto);
	}

	public FacebookDTO updateFacebook(FacebookDTO dto) {
		validate(dto);
		return socialServiceClient.updateFacebook(dto.getUserId(), dto);
	}
	
	// GooglePlus
	public GooglePlusDTO getGooglePlus(String userId) {
		return socialServiceClient.getGooglePlus(userId);
	}
	
	public GooglePlusDTO createGooglePlus(GooglePlusDTO dto) {
		validate(dto);
		return socialServiceClient.createGooglePlus(dto);
	}

	public GooglePlusDTO updateGooglePlus(GooglePlusDTO dto) {
		validate(dto);
		return socialServiceClient.updateGooglePlus(dto.getUserId(), dto);
	}
	
	// Common Validation
	private void validate(final LatchSocialDTO social) {
		if(social == null || !social.validate())
			throw new IllegalArgumentException("UserId required");
	}
}

