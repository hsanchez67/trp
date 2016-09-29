package com.latch.service.feign.fallback;

import java.util.Collection;

import org.springframework.hateoas.PagedResources;

import com.latch.domain.TagDTO;
import com.latch.domain.UserDTO;
import com.latch.service.feign.TagServiceClient;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TagServiceClientFallbackHandler implements TagServiceClient {

	@Override
	public void applyTagsToUsers(Collection<String> tagIds, Collection<String> userIds) {
		log("applyTagsToUsers", new Object[] {tagIds, userIds});
	}
	
	@Override
	public TagDTO createNetworkTag(String networkId, String name) {
		log("createNetworkTag", new Object[] {networkId, name});
		return null;
	}
	
	@Override
	public TagDTO createUserTag(String ownerId, String name) {
		log("createUserTag", new Object[] {ownerId, name});
		return null;
	}
	
	@Override
	public void deleteTag(String id) {
		log("deleteTag", new Object[] {id});
	}
	
	@Override
	public PagedResources<TagDTO> findMyUserTags(String ownerId, int page, int size, String sort) {
		log("findMyUserTags", new Object[] {ownerId, page, size, sort});
		return null;
	}
	
	@Override
	public PagedResources<TagDTO> findMyUserTagsByNameContains(String ownerId, String name, int page, int size,
			String sort) {
		log("findMyUserTagsByNameContains", new Object[] {ownerId, name, page, size, sort});
		return null;
	}
	
	@Override
	public TagDTO findTagById(String id) {
		log("findTagById", new Object[] {id});
		return null;
	}
	
	@Override
	public PagedResources<TagDTO> findTagsByNetworkIds(Collection<String> networkIds, int page, int size, String sort) {
		log("findTagsByNetworkIds", new Object[] {networkIds, page, size, sort});
		return null;
	}
	
	@Override
	public PagedResources<TagDTO> findTagsByUserIds(Collection<String> userIds, int page, int size, String sort) {
		log("findTagsByUserIds", new Object[] {userIds, page, size, sort});
		return null;
	}
	
	@Override
	public PagedResources<UserDTO> findUsersByTagIds(Collection<String> tagIds, int page, int size, String sort) {
		log("findUsersByTagIds", new Object[] {tagIds, page, size, sort});
		return null;
	}
	
	@Override
	public void removeTagsFromUsers(Collection<String> tagIds, Collection<String> userIds) {
		log("removeTagsFromUsers", new Object[] {tagIds, userIds});
	}
	
		
	private void log(String method, Object[] args) {
		log.warn("Exception calling profession-service.{}({}) - circuit open", method, args);
	}
}
