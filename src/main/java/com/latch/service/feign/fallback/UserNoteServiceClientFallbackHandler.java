package com.latch.service.feign.fallback;

import org.springframework.hateoas.PagedResources;

import com.latch.domain.UserNoteDTO;
import com.latch.service.feign.UserNoteServiceClient;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UserNoteServiceClientFallbackHandler implements UserNoteServiceClient {

	@Override
	public UserNoteDTO create(UserNoteDTO userNote) {
		log("create", new Object[] {userNote});
		return null;
	}
	
	@Override
	public void delete(String id) {
		log("delete", new Object[] {id});
	}
	
	@Override
	public UserNoteDTO findById(String id) {
		log("findById", new Object[] {id});
		return null;
	}
	
	@Override
	public UserNoteDTO findOneByOwnerUserIdAndTargetUserId(String ownerUserId, String targetUserId) {
		log("findOneByOwnerUserIdAndTargetUserId", new Object[] {ownerUserId, targetUserId});
		return null;
	}
	
	@Override
	public UserNoteDTO update(String id, UserNoteDTO userNote) {
		log("update", new Object[] {id, userNote});
		return null;
	}

	@Override
	public PagedResources<UserNoteDTO> findUsers(String ownerUserId, String name, String profession, String city,
			String state, int page, int size, String sort) {
		log("findUsers", new Object[] {ownerUserId, name, profession, city, state, page, size, sort});
		return null;
	}
	
	@Override
	public PagedResources<UserNoteDTO> searchByKeyword(String ownerUserId, String keyword, int page, int size) {
		log("searchByKeyword", new Object[] {ownerUserId, keyword, page, size});
		return null;
	}
	
	private void log(String method, Object[] args) {
		log.warn("Exception calling profession-service.{}({}) - circuit open", method, args);
	}
}
