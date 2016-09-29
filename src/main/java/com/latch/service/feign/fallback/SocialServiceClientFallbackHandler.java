package com.latch.service.feign.fallback;

import com.latch.domain.facebook.FacebookDTO;
import com.latch.domain.googleplus.GooglePlusDTO;
import com.latch.domain.instagram.InstagramDTO;
import com.latch.domain.linkein.LinkedInDTO;
import com.latch.domain.zillow.ZillowDTO;
import com.latch.service.feign.SocialServiceClient;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SocialServiceClientFallbackHandler implements SocialServiceClient {

	@Override
	public FacebookDTO createFacebook(FacebookDTO dto) {
		log("createFacebook", new Object[] {dto});
		return null;
	}
	
	@Override
	public GooglePlusDTO createGooglePlus(GooglePlusDTO dto) {
		log("createGooglePlus", new Object[] {dto});
		return null;
	}
	
	@Override
	public InstagramDTO createInstagram(InstagramDTO dto) {
		log("createInstagram", new Object[] {dto});
		return null;
	}
	
	@Override
	public LinkedInDTO createLinkedin(LinkedInDTO dto) {
		log("createLinkedin", new Object[] {dto});
		return null;
	}
	
	@Override
	public ZillowDTO createZillow(ZillowDTO dto) {
		log("createZillow", new Object[] {dto});
		return null;
	}
	
	@Override
	public FacebookDTO getFacebook(String userId) {
		log("getFacebook", new Object[] {userId});
		return null;
	}
	
	@Override
	public GooglePlusDTO getGooglePlus(String userId) {
		log("getGooglePlus", new Object[] {userId});
		return null;
	}
	
	@Override
	public InstagramDTO getInstagram(String userId) {
		log("getInstagram", new Object[] {userId});
		return null;
	}
	
	@Override
	public LinkedInDTO getLinkedin(String userId) {
		log("getLinkedin", new Object[] {userId});
		return null;
	}
	
	@Override
	public ZillowDTO getZillow(String userId) {
		log("getZillow", new Object[] {userId});
		return null;
	}
	
	@Override
	public FacebookDTO updateFacebook(String userId, FacebookDTO dto) {
		log("updateFacebook", new Object[] {userId, dto});
		return null;
	}
	
	@Override
	public GooglePlusDTO updateGooglePlus(String userId, GooglePlusDTO dto) {
		log("updateGooglePlus", new Object[] {userId, dto});
		return null;
	}
	
	@Override
	public InstagramDTO updateInstagram(String userId, InstagramDTO dto) {
		log("updateInstagram", new Object[] {userId, dto});
		return null;
	}
	
	@Override
	public LinkedInDTO updateLinkedin(String userId, LinkedInDTO dto) {
		log("updateLinkedin", new Object[] {userId, dto});
		return null;
	}
	
	@Override
	public ZillowDTO updateZillow(String userId, ZillowDTO dto) {
		log("updateZillow", new Object[] {userId, dto});
		return null;
	}
		
	private void log(String method, Object[] args) {
		log.warn("Exception calling profession-service.{}({}) - circuit open", method, args);
	}
}
