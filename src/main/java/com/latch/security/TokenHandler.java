package com.latch.security;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public final class TokenHandler {
	
	@Value("${APP_JWT_SECRET:Not2Secret}")
	private String secret;

	public String parseUsernameFromToken(String token) {
		return Jwts.parser()
				.setSigningKey(secret)
				.parseClaimsJws(token)
				.getBody()
				.getSubject();
	}
	
	public String parseClaimFromToken(String token, String claimName) {
		return Jwts.parser()
				.setSigningKey(secret)
				.parseClaimsJws(token)
				.getBody()
				.get(claimName, String.class);
	}
	
	public String createTokenForUser(String username) {
		return Jwts.builder()
				.setSubject(username)
				.signWith(SignatureAlgorithm.HS512, secret)
				.compact();
	}
	
	public String createTokenForUser(String username, String claimName, String claimValue) {
		return Jwts.builder()
				.claim(claimName, claimValue)
				.setSubject(username)
				//.setExpiration(Date.valueOf(LocalDate.now())) // can add an expirationDate
				.signWith(SignatureAlgorithm.HS256, secret)
				.compact();
	}

	public String createTokenForUser(String username, Map<String, Object> claims) {
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(username)
				//.setExpiration(Date.valueOf(LocalDate.now())) // can add an expirationDate
				.signWith(SignatureAlgorithm.HS256, secret)
				.compact();
	}

}
