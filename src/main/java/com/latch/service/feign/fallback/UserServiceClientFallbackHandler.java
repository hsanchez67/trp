package com.latch.service.feign.fallback;

import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resources;

import com.latch.domain.NetworkDTO;
import com.latch.domain.UserDTO;
import com.latch.service.feign.UserServiceClient;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UserServiceClientFallbackHandler implements UserServiceClient {

	@Override
	public PagedResources<UserDTO> findAllBySpecification(String search, int page, int size, String sort) {
		log("findAllBySpecification", new Object[] {search, page, size, sort});
		return null;
	}
	
	@Override
	public PagedResources<UserDTO> searchByKeyword(String keyword, String visible, int page, int size) {
		log("searchByKeyword", new Object[] {keyword, visible, page, size});
		return null;
	}
	
	@Override
	public void addToShortlist(String userid, String userUrisToAdd) {
		log("addToShortlist", new Object[] {userid, userUrisToAdd});
	}
	
	@Override
	public UserDTO create(UserDTO user) {
		log("create", new Object[] {user});
		return null;
	}
	
	@Override
	public PagedResources<UserDTO> findByAvatar(String avatar) {
		log("findByAvatar", new Object[] {avatar});
		return null;
	}
	
	@Override
	public PagedResources<UserDTO> findByAvatar(String avatar, int page, int size, String sort) {
		log("findByAvatar", new Object[] {avatar, page, size, sort});
		return null;
	}
	
	@Override
	public UserDTO findOneByEmail(String email) {
		log("findOneByEmail", new Object[] {email});
		return null;
	}
	
	@Override
	public UserDTO findOneByProfileName(String email) {
		log("findOneByProfileName", new Object[] {email});
		return null;
	}
	
	@Deprecated
	@Override
	public PagedResources<UserDTO> findUsers(String name, String profession, String city, String state, String networkid, int page,
			int size, String sort) {
		log("findUsers", new Object[] {name, profession, city, state, networkid, page, size, sort});
		return null;
	}

	@Override
	public PagedResources<UserDTO> findUsers(String name, String profession, String city, String state, String networkid, String shortlistid, String tagid, int page,
			int size, String sort) {
		log("findUsers", new Object[] {name, profession, city, state, networkid, shortlistid, tagid, page, size, sort});
		return null;
	}

	@Override
	public NetworkDTO getMyNetwork(String id) {
		log("getMyNetwork", new Object[] {id});
		return null;
	}
	
	@Override
	public Resources<NetworkDTO> getNetworks(String userid) {
		log("getNetworks", new Object[] {userid});
		return null;
	}
	@Override
	public Resources<NetworkDTO> getNetworksOwned(String userid, int page, int size, String sort) {
		log("getNetworksOwned", new Object[] {userid, page, size, sort});
		return null;
	}

	@Override
	public UserDTO getOne(String userid) {
		log("getOne", new Object[] {userid});
		return null;
	}
	
	@Override
	public Resources<UserDTO> getShortlist(String userid) {
		log("getShortlist", new Object[] {userid});
		return null;
	}
	
	@Override
	public void joinNetworks(String userid, String networkUris) {
		log("joinNetworks", new Object[] {userid, networkUris});
	}
	
	@Override
	public void leaveNetwork(String userid, String networkid) {
		log("leaveNetwork", new Object[] {userid, networkid});
	}
	
	@Override
	public void removeFromShortlist(String userid, String useridToRemove) {
		log("removeFromShortlist", new Object[] {userid, useridToRemove});
	}
	
	@Override
	public PagedResources<UserDTO> searchByKeyword(String keyword, int page, int size) {
		log("searchByKeyword", new Object[] {keyword, page, size});
		return null;
	}
	
	@Override
	public UserDTO update(String userid, UserDTO user) {
		log("update", new Object[] {user});
		return null;
	}
	
	private void log(String method, Object[] args) {
		log.warn("Exception calling profession-service.{}({}) - circuit open", method, args);
	}
}
