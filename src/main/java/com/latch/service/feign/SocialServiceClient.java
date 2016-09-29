package com.latch.service.feign;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.latch.domain.facebook.FacebookDTO;
import com.latch.domain.googleplus.GooglePlusDTO;
import com.latch.domain.instagram.InstagramDTO;
import com.latch.domain.linkein.LinkedInDTO;
import com.latch.domain.zillow.ZillowDTO;
import com.latch.service.feign.fallback.SocialServiceClientFallbackHandler;

@FeignClient(name = "social-service", decode404 = true, fallback = SocialServiceClientFallbackHandler.class)
public interface SocialServiceClient {

	@RequestMapping(value = "/zillows", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	ZillowDTO createZillow(ZillowDTO dto);
	@RequestMapping(value = "/zillows/{id}", method = RequestMethod.PUT, consumes=MediaType.APPLICATION_JSON_VALUE)
	ZillowDTO updateZillow(@PathVariable("id") String userId, ZillowDTO dto);
	@RequestMapping(value = "/zillows/{id}", method = RequestMethod.GET)
	ZillowDTO getZillow(@PathVariable("id") String userId);
	
	@RequestMapping(value = "/linkedins", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	LinkedInDTO createLinkedin(LinkedInDTO dto);
	@RequestMapping(value = "/linkedins/{id}", method = RequestMethod.PUT, consumes=MediaType.APPLICATION_JSON_VALUE)
	LinkedInDTO updateLinkedin(@PathVariable("id") String userId, LinkedInDTO dto);
	@RequestMapping(value = "/linkedins/{id}", method = RequestMethod.GET)
	LinkedInDTO getLinkedin(@PathVariable("id") String userId);

	@RequestMapping(value = "/instagrams", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	InstagramDTO createInstagram(InstagramDTO dto);
	@RequestMapping(value = "/instagrams/{id}", method = RequestMethod.PUT, consumes=MediaType.APPLICATION_JSON_VALUE)
	InstagramDTO updateInstagram(@PathVariable("id") String userId, InstagramDTO dto);
	@RequestMapping(value = "/instagrams/{id}", method = RequestMethod.GET)
	InstagramDTO getInstagram(@PathVariable("id") String userId);

	@RequestMapping(value = "/googlePluses", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	GooglePlusDTO createGooglePlus(GooglePlusDTO dto);
	@RequestMapping(value = "/googlePluses/{id}", method = RequestMethod.PUT, consumes=MediaType.APPLICATION_JSON_VALUE)
	GooglePlusDTO updateGooglePlus(@PathVariable("id") String userId, GooglePlusDTO dto);
	@RequestMapping(value = "/googlePluses/{id}", method = RequestMethod.GET)
	GooglePlusDTO getGooglePlus(@PathVariable("id") String userId);

	@RequestMapping(value = "/facebooks", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	FacebookDTO createFacebook(FacebookDTO dto);
	@RequestMapping(value = "/facebooks/{id}", method = RequestMethod.PUT, consumes=MediaType.APPLICATION_JSON_VALUE)
	FacebookDTO updateFacebook(@PathVariable("id") String userId, FacebookDTO dto);
	@RequestMapping(value = "/facebooks/{id}", method = RequestMethod.GET)
	FacebookDTO getFacebook(@PathVariable("id") String userId);
	
}
