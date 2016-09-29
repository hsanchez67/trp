package com.latch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.latch.security.TokenHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class SecureAccessController {

	private final TokenHandler tokenHandler;
	
	@Autowired
	public SecureAccessController(TokenHandler tokenHandler) {
		this.tokenHandler = tokenHandler;
	}
	
	@RequestMapping(value = "/secureAccess/{jwtToken:.+}")
	public String access(@PathVariable("jwtToken") String token) {

		String requestType = tokenHandler.parseClaimFromToken(token, "requestType");
		log.debug("## RequestType {} ", requestType);
		
		// TODO: externalize requestType => requestPath to xxx-service.yml
		String requestPath = "/login";
		switch(requestType) {
			case "reviewRequest":
				requestPath = "/reviewRequestByToken/";
				break;
			case "introductionRequest":
				requestPath = "/introductionRequestByToken/";
				break;
			case "referralRequest":
				requestPath = "/referralRequestByToken/";
				break;
			default:
				log.debug("## Unknown RequestType {} ", requestType);
		}
		log.debug("## Request Path: {}", requestPath + token);
		
		return "forward:" + requestPath + token;
	}
}
