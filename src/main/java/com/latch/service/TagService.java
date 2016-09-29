package com.latch.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.PagedResources;
import org.springframework.stereotype.Service;

import com.latch.domain.TagDTO;
import com.latch.domain.UserDTO;
import com.latch.logging.LogEvent;
import com.latch.service.feign.TagServiceClient;
import com.latch.service.feign.UserServiceClient;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TagService {

	private final TagServiceClient tagServiceClient;
	private final UserServiceClient userServiceClient;
	
	@Autowired
	public TagService(TagServiceClient tagServiceClient, UserServiceClient userServiceClient) {
		this.tagServiceClient = tagServiceClient;
		this.userServiceClient = userServiceClient;
	}
	
	// Common
	public void deleteTag(String id) {
		new LogEvent()
			.addProperty("event", "deleteTag")
			.addProperty("id", id)
			.writeLogInfo(log);

		tagServiceClient.deleteTag(id);
	}

	public TagDTO findTagById(String id) {
		return tagServiceClient.findTagById(id);
	}

	public void applyTagsToUsers(Collection<String> tagIds, Collection<String> userIds) {
		new LogEvent()
			.addProperty("event", "applyTagsToUsers")
			.addProperty("tagIds", tagIds)
			.addProperty("userIds", userIds)
			.writeLogInfo(log);

		tagServiceClient.applyTagsToUsers(tagIds, userIds);
	}
	
	public void removeTagsFromUsers(Collection<String> tagIds, Collection<String> userIds) {
		new LogEvent()
			.addProperty("event", "removeTagsFromUsers")
			.addProperty("tagIds", tagIds)
			.addProperty("userIds", userIds)
			.writeLogInfo(log);

		tagServiceClient.removeTagsFromUsers(tagIds, userIds);
	}
	
	public PagedResources<UserDTO> findUsersByTagIds(Collection<String> tagIds, int page, int size, String sort) {
		PagedResources<UserDTO> usersPage = tagServiceClient.findUsersByTagIds(tagIds, page, size, sort);
		if(!(usersPage.getContent().size() > 0)) {
			return usersPage;
		}
		Collection<UserDTO> users = usersPage.getContent().stream()
				.filter(e -> e != null)
				.filter(e -> e.getId() != null)
				.map(e -> userServiceClient.getOne(e.getId()))
				.filter(e -> e != null)
				.collect(Collectors.toList());
		
		return new PagedResources<>(users, usersPage.getMetadata(), usersPage.getLinks());
	}
	
	public PagedResources<?> findTagsByUserIds(Collection<String> userIds, int page, int size, String sort) {
		return tagServiceClient.findTagsByUserIds(userIds, page, size, sort);
	}
	
	public PagedResources<?> findTagsByNetworkIds(Collection<String> networkIds, int page, int size, String sort) {
		return tagServiceClient.findTagsByNetworkIds(networkIds, page, size, sort);
	}
	
	public boolean userExistsWithTag(String userId, String tagId) {
		PagedResources<TagDTO> tags = tagServiceClient.findTagsByUserIds(Arrays.asList(new String[]{userId}), 0, 999, "");
		return tags.getContent().stream()
			.filter(e -> e != null)
			.filter(e -> tagId.equals(e.getId()))
			.findFirst()
			.isPresent();
	}

	// UserTags
	public TagDTO createUserTag(String ownerId, String name) {
		new LogEvent()
			.addProperty("event", "createUserTag")
			.addProperty("ownerId", ownerId)
			.addProperty("name", name)
			.writeLogInfo(log);

		return tagServiceClient.createUserTag(ownerId, name);
	}

	public PagedResources<TagDTO> findMyUserTags(String ownerId, int page, int size, String sort) {
		return tagServiceClient.findMyUserTags(ownerId, page, size, sort);
	}

	public PagedResources<TagDTO> findMyUserTagsByNameContains(String ownerId, String name, int page, int size, String sort) {
		return tagServiceClient.findMyUserTagsByNameContains(ownerId, name, page, size, sort);
	}

	
	// NetworkTags
	public TagDTO createNetworkTag(String networkId, String name) {
		new LogEvent()
			.addProperty("event", "createNetworkTag")
			.addProperty("networkId", networkId)
			.addProperty("name", name)
			.writeLogInfo(log);

		return tagServiceClient.createNetworkTag(networkId, name);
	}
}