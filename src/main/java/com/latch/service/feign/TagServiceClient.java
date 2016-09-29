package com.latch.service.feign;

import java.util.Collection;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.latch.domain.TagDTO;
import com.latch.domain.UserDTO;
import com.latch.service.feign.fallback.TagServiceClientFallbackHandler;

@FeignClient(name = "user-service", decode404 = true, fallback = TagServiceClientFallbackHandler.class)
public interface TagServiceClient {

	// Common
	@RequestMapping(value = "/tags/{id}", method = RequestMethod.DELETE)
	void deleteTag(@PathVariable("id") String id);

	@RequestMapping(value = "/tags/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	TagDTO findTagById(@PathVariable("id") String id);

	@RequestMapping(value = "/tags/action/applyTagsToUsers", method = RequestMethod.POST)
	void applyTagsToUsers(@RequestParam("tagIds") Collection<String> tagIds, @RequestParam("userIds") Collection<String> userIds);
	
	@RequestMapping(value = "/tags/action/removeTagsFromUsers", method = RequestMethod.POST)
	void removeTagsFromUsers(@RequestParam("tagIds") Collection<String> tagIds, @RequestParam("userIds") Collection<String> userIds);
	
	@RequestMapping(value = "/tags/search/findUsersByTagIds", method = RequestMethod.GET, produces = "application/hal+json;charset=UTF-8")
	PagedResources<UserDTO> findUsersByTagIds(@RequestParam("tagIds") Collection<String> tagIds, @RequestParam("page") int page,
			@RequestParam("size") int size, @RequestParam("sort") String sort);
	
	@RequestMapping(value = "/tags/search/findTagsByUserIds", method = RequestMethod.GET, produces = "application/hal+json;charset=UTF-8")
	PagedResources<TagDTO> findTagsByUserIds(@RequestParam("userIds") Collection<String> userIds, @RequestParam("page") int page,
			@RequestParam("size") int size, @RequestParam("sort") String sort);
	

	@RequestMapping(value = "/tags/search/findTagsByNetworkIds", method = RequestMethod.GET, produces = "application/hal+json;charset=UTF-8")
	PagedResources<TagDTO> findTagsByNetworkIds(@RequestParam("networkIds") Collection<String> networkIds, @RequestParam("page") int page,
			@RequestParam("size") int size, @RequestParam("sort") String sort);
	

	// UserTags
	@RequestMapping(value = "/tags/action/createUserTag", method = RequestMethod.POST)
	TagDTO createUserTag(@RequestParam("ownerId") String ownerId, @RequestParam("name") String name);

	@RequestMapping(value = "/tags/search/findMyUserTags", method = RequestMethod.GET)
	PagedResources<TagDTO> findMyUserTags(@RequestParam("ownerId") String ownerId, @RequestParam("page") int page,
			@RequestParam("size") int size, @RequestParam("sort") String sort);

	@RequestMapping(value = "/tags/search/findMyUserTagsByNameContains", method = RequestMethod.GET)
	PagedResources<TagDTO> findMyUserTagsByNameContains(@RequestParam("ownerId") String ownerId,
			@RequestParam("name") String name, @RequestParam("page") int page, @RequestParam("size") int size,
			@RequestParam("sort") String sort);
	
	// NetworkTags
	@RequestMapping(value = "/tags/action/createNetworkTag", method = RequestMethod.POST)
	TagDTO createNetworkTag(@RequestParam("networkId") String networkId, @RequestParam("name") String name);
}