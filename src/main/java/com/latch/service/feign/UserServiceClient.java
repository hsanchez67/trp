package com.latch.service.feign;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resources;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.latch.domain.NetworkDTO;
import com.latch.domain.UserDTO;
import com.latch.service.feign.fallback.UserServiceClientFallbackHandler;

/**
 * This is a proxy client to the user-service backend.
 * 
 * 
 * @author Brett
 */
@FeignClient(name = "user-service", decode404 = true, fallback = UserServiceClientFallbackHandler.class)
public interface UserServiceClient {

	@RequestMapping(method = RequestMethod.POST, value = "/users/search/findAllBySpecification", produces = "application/hal+json")
	PagedResources<UserDTO> findAllBySpecification(
			@RequestParam("search") String search, 
			@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("sort") String sort);	

	// Users
	@RequestMapping(value = "/users", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	UserDTO create(UserDTO user);

	@RequestMapping(value = "/users/{userid}", method = RequestMethod.GET)
	UserDTO getOne(@PathVariable("userid") String userid);

	@RequestMapping(value = "/users/{userid}", method = RequestMethod.PUT, consumes=MediaType.APPLICATION_JSON_VALUE)
	UserDTO update(@PathVariable("userid") String userid, UserDTO user);

	@RequestMapping(value = "/users/search/findOneByEmail?email={email}", method = RequestMethod.GET)
	UserDTO findOneByEmail(@PathVariable("email") String email);

	@Deprecated
	@RequestMapping(value = "/users/search/searchByKeyword?keyword={keyword}&page={page}&size={size}", method = RequestMethod.GET)
	PagedResources<UserDTO> searchByKeyword(@PathVariable("keyword") String keyword,
			@PathVariable("page") int page, @PathVariable("size") int size);

	@RequestMapping(value = "/users/search/searchByKeyword", method = RequestMethod.GET)
	PagedResources<UserDTO> searchByKeyword(
			@RequestParam("keyword") String keyword,
			@RequestParam(value = "visible", required = false, defaultValue = "0,1") String visible,
			@RequestParam("page") int page, @RequestParam("size") int size);
	
	@Deprecated
	@RequestMapping(value = "/users/search/findByAvatar?avatar={avatar}", method = RequestMethod.GET)
	PagedResources<UserDTO> findByAvatar(@PathVariable("avatar") String avatar);
	
	@RequestMapping(value = "/users/search/findByAvatar?avatar={avatar}&page={page}&size={size}&sort={sort}", method = RequestMethod.GET)
	PagedResources<UserDTO> findByAvatar(@PathVariable("avatar") String avatar, @PathVariable("page") int page,
			@PathVariable("size") int size, @PathVariable("sort") String sort);

	/**
	 * 
	 * @deprecated - see next version with expanded properties(shortlistid & tagid)
	 */
	@Deprecated
	@RequestMapping(value = "/users/search/findUsers", method = RequestMethod.GET)
	PagedResources<UserDTO> findUsers(@RequestParam("name") String name, @RequestParam("profession") String profession,
			@RequestParam("city") String city, @RequestParam("state") String state,
			@RequestParam("networkid") String networkid, @RequestParam("page") int page, @RequestParam("size") int size,
			@RequestParam("sort") String sort);
	
	@RequestMapping(value = "/users/search/findUsers", method = RequestMethod.GET)
	PagedResources<UserDTO> findUsers(@RequestParam("name") String name, @RequestParam("profession") String profession,
			@RequestParam("city") String city, @RequestParam("state") String state,
			@RequestParam("networkid") String networkid, @RequestParam("shortlistid") String shortlistid,
			@RequestParam("tagid") String tagid, @RequestParam("page") int page, @RequestParam("size") int size,
			@RequestParam("sort") String sort);


	@RequestMapping(value = "/users/search/findOneByProfileName?profileName={profileName}", method = RequestMethod.GET)
	UserDTO findOneByProfileName(@PathVariable("profileName") String email);
	
	
	// User->Networks
	@RequestMapping(value = "/users/{userid}/networks", method = RequestMethod.GET)
	Resources<NetworkDTO> getNetworks(@PathVariable("userid") String userid);
	
	@RequestMapping(value = "/users/{userid}/networks", method = RequestMethod.POST, consumes="text/uri-list")
	void joinNetworks(@PathVariable("userid") String userid, String networkUris);

	@RequestMapping(value = "/users/{userid}/networks/{networkid}", method = RequestMethod.DELETE)
	void leaveNetwork(@PathVariable("userid") String userid, @PathVariable("networkid") String networkid);

	@RequestMapping(value = "/users/{userid}/networksOwned", method = RequestMethod.GET)
	Resources<NetworkDTO> getNetworksOwned(@PathVariable("userid") String userid, @RequestParam("page") int page, @RequestParam("size") int size,
			@RequestParam("sort") String sort);
	
	// User->Shortlist
	@RequestMapping(value = "/users/{userid}/shortlist", method = RequestMethod.GET)
	Resources<UserDTO> getShortlist(@PathVariable("userid") String userid);

	@RequestMapping(value = "/users/{userid}/shortlist", method = RequestMethod.POST, consumes="text/uri-list")
	void addToShortlist(@PathVariable("userid") String userid, String userUrisToAdd);

	@RequestMapping(value = "/users/{userid}/shortlist/{useridToRemove}", method = RequestMethod.DELETE)
	void removeFromShortlist(@PathVariable("userid") String userid, @PathVariable("useridToRemove") String useridToRemove);
	
	
	
	// User->MyNetwork
	@RequestMapping(value = "/users/{id}/mynetwork", method = RequestMethod.GET)
	NetworkDTO getMyNetwork(@PathVariable("id") String id);

}
