package com.latch.service.feign.fallback;

import org.springframework.hateoas.PagedResources;

import com.latch.domain.RemoteFileDTO;
import com.latch.service.feign.RemoteFileServiceClient;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RemoteFileServiceClientFallbackHandler implements RemoteFileServiceClient {

	@Override
	public void delete(String id) {
		log("delete", new Object[] {id});
	}
	
	@Override
	public PagedResources<RemoteFileDTO> getRemoteFiles() {
		log("getRemoteFiles", new Object[] {""});
		return null;
	}
	
	@Override
	public PagedResources<RemoteFileDTO> getRemoteFilesByOwnerid(String ownerid) {
		log("getRemoteFilesByOwnerid", new Object[] {ownerid});
		return null;
	}

	private void log(String method, Object[] args) {
		log.warn("Exception calling profession-service.{}({}) - circuit open", method, args);
	}
}
