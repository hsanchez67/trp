package com.latch.service.feign.fallback;

import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;

import com.latch.domain.NetworkDTO;
import com.latch.domain.UserDTO;
import com.latch.service.feign.NetworkServiceClient;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class NetworkServiceClientFallbackHandler implements NetworkServiceClient {

	@Override
	public Resource<UserDTO> addManagers(String networkid, String userUris) {
		log("addManagers", new Object[] {networkid, userUris});
		return null;
	}
	@Override
	public Resource<UserDTO> addMembers(String networkid, String userUris) {
		log("addMembers", new Object[] {networkid, userUris});
		return null;
	}
	@Override
	public NetworkDTO create(NetworkDTO network) {
		log("create", new Object[] {network});
		return null;
	}
	@Override
	public Resources<UserDTO> getManagers(String id) {
		log("getManagers", new Object[] {id});
		return null;
	}
	@Override
	public PagedResources<UserDTO> getMembers(String networkid, int page, int size, String sort) {
		log("getMembers", new Object[] {networkid, page, size, sort});
		return null;
	}
	@Override
	public NetworkDTO getOne(String id) {
		log("getOne", new Object[] {id});
		return null;
	}
	@Override
	public UserDTO getOwner(String id) {
		log("getOwner", new Object[] {id});
		return null;
	}
	@Override
	public NetworkDTO getParent(String id) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Resource<UserDTO> removeManager(String networkid, String userid) {
		log("removeManager", new Object[] {networkid, userid});
		return null;
	}
	@Override
	public Resource<UserDTO> removeMember(String networkid, String userid) {
		log("removeMember", new Object[] {networkid, userid});
		return null;
	}
	@Override
	public NetworkDTO update(String id, NetworkDTO network) {
		log("update", new Object[] {network});
		return null;
	}
	
	private void log(String method, Object[] args) {
		log.warn("Exception calling network-service.{}({}) - circuit open", method, args);
	}
}
