package com.latch.service.feign.fallback;

import org.springframework.hateoas.PagedResources;

import com.latch.domain.ProfessionDTO;
import com.latch.service.feign.ProfessionServiceClient;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ProfessionServiceClientFallbackHandler implements ProfessionServiceClient {

	@Override
	public PagedResources<ProfessionDTO> findByTitleContainsIgnoreCase(String substr, int page, int size, String sort) {
		log("findByTitleContainsIgnoreCase", new Object[] {substr, page, size, sort});
		return null;
	}
	
	@Override
	public PagedResources<ProfessionDTO> getAll(int page, int size, String sort) {
		log("getAll", new Object[] {page, size, sort});
		return null;
	}
	
	@Override
	public ProfessionDTO getOne(String id) {
		log("getOne", new Object[] {id});
		return null;
	}

	private void log(String method, Object[] args) {
		log.warn("Exception calling profession-service.{}({}) - circuit open", method, args);
	}
}
