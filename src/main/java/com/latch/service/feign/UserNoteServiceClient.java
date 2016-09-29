package com.latch.service.feign;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.latch.domain.UserNoteDTO;
import com.latch.service.feign.fallback.UserNoteServiceClientFallbackHandler;

/**
 * This is a proxy client to the user-service backend.
 * 
 * 
 * @author Brett
 */
@FeignClient(name = "user-service", decode404 = true, fallback = UserNoteServiceClientFallbackHandler.class)
public interface UserNoteServiceClient {
	
	// UserNotes
	@RequestMapping(value = "/userNotes/{id}", method = RequestMethod.GET)
	UserNoteDTO findById(@PathVariable("id") String id);

	@RequestMapping(value = "/userNotes", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	UserNoteDTO create(UserNoteDTO userNote);

	@RequestMapping(value = "/userNotes/{id}", method = RequestMethod.PUT, consumes=MediaType.APPLICATION_JSON_VALUE)
	UserNoteDTO update(@PathVariable("id") String id, UserNoteDTO userNote);

	@RequestMapping(value = "/userNotes/search/findOneByOwnerUserIdAndTargetUserId", method = RequestMethod.GET)
	UserNoteDTO findOneByOwnerUserIdAndTargetUserId(@RequestParam("ownerUserId") String ownerUserId, @RequestParam("targetUserId") String targetUserId);
	
	@RequestMapping(value = "/userNotes/{id}", method = RequestMethod.DELETE)
	void delete(@PathVariable("id") String id);
	
	@RequestMapping(value = "/userNotess/search/searchByKeyword", method = RequestMethod.GET)
	PagedResources<UserNoteDTO> searchByKeyword(
			@RequestParam("ownerUserId") String ownerUserId,
			@RequestParam("keyword") String keyword,
			@RequestParam("page") int page, @RequestParam("size") int size);

	@RequestMapping(value = "/userNotes/search/findUserNotes", method = RequestMethod.GET)
	PagedResources<UserNoteDTO> findUsers(@RequestParam("ownerUserId") String ownerUserId, 
			@RequestParam("name") String name, @RequestParam("profession") String profession,
			@RequestParam("city") String city, @RequestParam("state") String state,
			@RequestParam("page") int page, @RequestParam("size") int size,
			@RequestParam("sort") String sort);
}
