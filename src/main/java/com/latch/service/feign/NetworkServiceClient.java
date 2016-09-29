package com.latch.service.feign;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.latch.domain.NetworkDTO;
import com.latch.domain.UserDTO;
import com.latch.service.feign.fallback.NetworkServiceClientFallbackHandler;

/**
 * This is a proxy client to the network functions of the back-end user-service.
 * 
 * 
 * @author Brett
 */
@FeignClient(name = "user-service", decode404 = true, fallback = NetworkServiceClientFallbackHandler.class )
public interface NetworkServiceClient {

	@RequestMapping(value = "/networks", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	NetworkDTO create(NetworkDTO network);

	@RequestMapping(value = "/networks/{id}", method = RequestMethod.GET)
	NetworkDTO getOne(@PathVariable("id") String id);

	@RequestMapping(value = "/networks/{id}", method = RequestMethod.PUT, consumes=MediaType.APPLICATION_JSON_VALUE)
	NetworkDTO update(@PathVariable("id") String id, NetworkDTO network);
	
	@RequestMapping(value = "/networks/{id}/owner", method = RequestMethod.GET)
	UserDTO getOwner(@PathVariable("id") String id);
	
	@RequestMapping(value = "/networks/{id}/parent", method = RequestMethod.GET)
	NetworkDTO getParent(@PathVariable("id") String id);
	
	// Network->Members
	@RequestMapping(value = "/networks/{networkid}/members", method = RequestMethod.GET)
	PagedResources<UserDTO> getMembers(@PathVariable("networkid") String networkid,
			@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("sort") String sort);

	@RequestMapping(value = "/networks/{networkid}/members", method = RequestMethod.POST, consumes="text/uri-list")
	Resource<UserDTO> addMembers(@PathVariable("networkid") String networkid, String userUris);

	@RequestMapping(value = "/networks/{networkid}/members/{userid}", method = RequestMethod.DELETE)
	Resource<UserDTO> removeMember(@PathVariable("networkid") String networkid, @PathVariable("userid") String userid);

	// Network->Managers
	@RequestMapping(value = "/networks/{id}/managers", method = RequestMethod.GET)
	Resources<UserDTO> getManagers(@PathVariable("id") String id);

	@RequestMapping(value = "/networks/{networkid}/managers", method = RequestMethod.POST, consumes="text/uri-list")
	Resource<UserDTO> addManagers(@PathVariable("networkid") String networkid, String userUris);

	@RequestMapping(value = "/networks/{networkid}/managers/{userid}", method = RequestMethod.DELETE)
	Resource<UserDTO> removeManager(@PathVariable("networkid") String networkid, @PathVariable("userid") String userid);
	
}
