package com.latch.service;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resources;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.latch.domain.NetworkDTO;
import com.latch.domain.UserDTO;
import com.latch.logging.LogEvent;
import com.latch.service.feign.UserServiceClient;

import feign.FeignException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {

	public static final BCryptPasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

	private final UserServiceClient userServiceClient;

	@Autowired
	public UserService(UserServiceClient userServiceClient) {
		this.userServiceClient = userServiceClient;
	}

	/**
	 * Proxy to update <code>User</code> in backend service
	 * 
	 * @param
	 *            user to persist in the backend
	 * @return updated UserDTO with any modifications made by the backend
	 *         service
	 */
	public Optional<UserDTO> update(UserDTO user) {
		Assert.notNull(user, "User required.");
		Assert.hasText(user.getId(), "User.id required.");
		new LogEvent()
			.addProperty("event", "updateUser")
			.addProperty("user", user)
			.writeLogInfo(log);

		return Optional.ofNullable(userServiceClient.update(user.getId(), user));
	}

	/**
	 * Create a new <code>User</code> in the backend service
	 * 
	 * @param
	 *            user to create in the backend
	 * @return created UserDTO with any modifications made by the backend
	 *         service
	 */
	public Optional<UserDTO> create(UserDTO user) {

		try {
			UserDTO preExists = userServiceClient.findOneByEmail(user.getEmail());
			if (preExists != null) {
				String message = String.format("User with email %s already exists.", user.getEmail());
				log.debug(message);
				throw new RuntimeException(message);
			}
		} catch(FeignException e) {
			// 404 user not found by email address. all is good.
		}
		// Encode the Password if is not empty
		if (!user.getPassword().equals("")) {
			user.setPassword(PASSWORD_ENCODER.encode(user.getPassword()));
		}

		String[] roles = user.getRoles();
		if (ArrayUtils.isEmpty(roles)) {
			user.setRoles(ArrayUtils.toArray("USER"));
		}
		new LogEvent()
			.addProperty("event", "createUser")
			.addProperty("user", user)
			.writeLogInfo(log);

		return Optional.ofNullable(userServiceClient.create(user));
	}

	/**
	 * Get User by id
	 * 
	 * @param
	 *            id
	 * @return an Optional containing the User or null
	 */
	public Optional<UserDTO> getUserById(String id) {
		UserDTO c = userServiceClient.getOne(id);
		return Optional.ofNullable(c);
	}

	/**
	 * Find a User by email
	 * 
	 * @param
	 *            profileName
	 * @return an Optional containing the User or null
	 */
	public Optional<UserDTO> getUserByProfileName(String profileName) {
		UserDTO c = userServiceClient.findOneByProfileName(profileName);
		return Optional.ofNullable(c);
	}

	/**
	 * Find a User by email
	 *
	 * @param
	 *            email
	 * @return an Optional containing the User or null
	 */
	public Optional<UserDTO> getUserByEmail(String email) {
		UserDTO c = userServiceClient.findOneByEmail(email);
		return Optional.ofNullable(c);
	}

	/**
	 * Used with JWT Token based authentication to fully authenticate the user without prompting with a Form login 
	 * 
	 * @param user The user to set the SecurityConext for
	 */
	public void setAuthenticated(UserDTO user) {
		UserDetails principal = new User(user.getEmail(), user.getPassword(),
				AuthorityUtils.createAuthorityList(user.getRoles()));
		Authentication auth = new UsernamePasswordAuthenticationToken(principal, user.getPassword(),
				AuthorityUtils.createAuthorityList(user.getRoles()));
		SecurityContextHolder.getContext().setAuthentication(auth);
	}

	/**
	 * get UserDetails for the currently authenticated user.
	 * 
	 * @return UserDetails for the currently authenticated user.
	 * @deprecated Add Principal principal as a method parameter instead and Spring will inject the currently logged in Principal.
	 */
	@Deprecated
	public UserDetails getPrincipal() {
		SecurityContext context = SecurityContextHolder.getContext();
		Authentication authentication = context.getAuthentication();
		if (authentication == null)
			return null;
		return (UserDetails) authentication.getPrincipal();
	}

	/**
	 * get isAuthenticated for the currently authenticated user.
	 *
	 * @return true a user is currently authenticated.
	 */
	public boolean isAuthenticated(){

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return authentication != null && !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated();

	}
	
	/**
	 * fulltext search across firstName, lastName & email
	 * 		results sorted by relevance
	 * 
	 * @param searchTerm
	 * @param page
	 * @param size
	 * @return
	 */
	@Deprecated
	public PagedResources<UserDTO> searchByKeyword(String searchTerm, int page, int size) {
		return userServiceClient.searchByKeyword(searchTerm, page, size);
	}

	public PagedResources<UserDTO> searchByKeyword(String searchTerm, String visible, int page, int size) {
		return userServiceClient.searchByKeyword(searchTerm, visible, page, size);
	}
	
	/**
	 * search for Users by avatar
	 * 
	 * @param avatar
	 * @param page
	 * @param size
	 * @param sort
	 * @return
	 */
	public PagedResources<UserDTO> findByAvatar(String avatar, int page, int size, String sort) {
		return userServiceClient.findByAvatar(avatar, page, size, sort);
	}
	
	/**
	 * search for a list of Users matching submitted name, professions, city & state
	 * 
	 * @param name
	 * @param profession
	 * @param city
	 * @param state
	 * @param networkid
	 * @param page
	 * @param size
	 * @param sort
	 * @return
	 * @deprecated use {@link #findUsers(String, String, String, String, String, String, String, int, int, String)} instead.
	 */
	@Deprecated
	public PagedResources<UserDTO> findUsers(String name, String profession, String city, String state, String networkid, int page, int size, String sort) {
		return userServiceClient.findUsers(name, profession, city, state, networkid, "", "", page, size, sort);
	}
	/**
	 * search for a list of Users matching submitted name, professions, city & state
	 * 
	 * @param name
	 * @param profession
	 * @param city
	 * @param state
	 * @param networkid
	 * @param shortlistid
	 * @param tagid
	 * @param page
	 * @param size
	 * @param sort
	 * @return
	 */ 
	public PagedResources<UserDTO> findUsers(String name, String profession, String city, String state, String networkid, String shortlistid, String tagid, int page, int size, String sort) {
		return userServiceClient.findUsers(name, profession, city, state, networkid, shortlistid, tagid, page, size, sort);
	}

	/**
	 * return the list of Networks the supplied user is a member of
	 * 
	 * @param user(member)
	 * @return
	 */
	public Resources<NetworkDTO> getNetworks(UserDTO user) {
		return userServiceClient.getNetworks(user.getId());
	}

	/**
	 * return the list of Networks Owned by the supplied user
	 * 
	 * @param user(owner)
	 * @return
	 */
	public Resources<NetworkDTO> getNetworksOwned(UserDTO user, int page, int size, String sort) {
		return userServiceClient.getNetworksOwned(user.getId(), page, size, sort);
	}

	/**
	 * Join user to networks
	 * 
	 * @param user
	 * @param networksToAdd
	 */
	public void joinNetworks(UserDTO user, Collection<NetworkDTO> networksToAdd) {
		new LogEvent()
			.addProperty("event", "addMembersToNetworks")
			.addProperty("networks", networksToAdd)
			.addProperty("users", Collections.singletonList(user))
			.writeLogInfo(log);

		StringBuilder networkUris = new StringBuilder();
		networksToAdd.forEach(networkToAdd -> {
			networkUris.append(String.format("http://localhost:8001/networks/%s\n", networkToAdd.getId()));
		});
	
		userServiceClient.joinNetworks(user.getId(), networkUris.toString());
	}

	/**
	 * remove user from network
	 * 
	 * @param user
	 * @param networkToRemove
	 */
	public void leaveNetwork(UserDTO user, NetworkDTO networkToRemove) {
		new LogEvent()
			.addProperty("event", "removeMembersFromNetworks")
			.addProperty("networks", Collections.singletonList(networkToRemove))
			.addProperty("users", Collections.singletonList(user))
			.writeLogInfo(log);
		userServiceClient.leaveNetwork(user.getId(), networkToRemove.getId());
	}

	/**
	 * return the shortlist of Users for the supplied User
	 * 
	 * @param user
	 * @return
	 */
	public Resources<UserDTO> getShortlist(UserDTO user) {
		return userServiceClient.getShortlist(user.getId());
	}

	/**
	 * return true if targetUserId exists in owners shortlist
	 * 
	 * @param owner
	 * @param targetUserId
	 * @return
	 */
	public boolean userExistsInShortlist(UserDTO owner, String targetUserId) {
		Assert.hasText(targetUserId, "targetUserId Required");
		
		return getShortlist(owner).getContent().stream()
				.filter(e -> e != null)
				.filter(e -> e.getId().equals(targetUserId))
				.findFirst()
				.isPresent();
	}
	
	/**
	 * Add User(s) to a Users Shortlist
	 * 
	 * @param user
	 * @param usersToAdd
	 */
	public void addUserToShortlist(UserDTO user, Collection<UserDTO> usersToAdd) {
		new LogEvent()
			.addProperty("event", "addUsersToShortlist")
			.addProperty("owner", user)
			.addProperty("users", usersToAdd)
			.writeLogInfo(log);

		StringBuilder userUris = new StringBuilder();
		usersToAdd.forEach(userToAdd -> {
			userUris.append(String.format("http://localhost:8001/users/%s\n", userToAdd.getId()));
		});
		userServiceClient.addToShortlist(user.getId(), userUris.toString());
	}
	
	public void removeUserFromShortlist(UserDTO user, UserDTO userToRemove) {
		new LogEvent()
			.addProperty("event", "removeUsersFromShortlist")
			.addProperty("owner", user)
			.addProperty("users", userToRemove)
			.writeLogInfo(log);

		userServiceClient.removeFromShortlist(user.getId(), userToRemove.getId());
	}
	
	/**
	 * return the Network identified as MyNetwork for the supplied User
	 * 
	 * @param user
	 * @return
	 */
	public Optional<NetworkDTO> getMyNetwork(UserDTO user) {
		NetworkDTO myNetwork = userServiceClient.getMyNetwork(user.getId()); 
		return Optional.ofNullable(myNetwork);
	}
	
}
