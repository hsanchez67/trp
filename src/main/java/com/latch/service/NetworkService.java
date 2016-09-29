package com.latch.service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PathVariable;

import com.latch.domain.NetworkDTO;
import com.latch.domain.UserDTO;
import com.latch.logging.LogEvent;
import com.latch.service.feign.NetworkServiceClient;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class NetworkService {

	private final NetworkServiceClient networkServiceClient;

	@Autowired
	public NetworkService(NetworkServiceClient networkServiceClient) {
		this.networkServiceClient = networkServiceClient;
	}

	/**
	 * Proxy to update <code>Network</code> in back-end service
	 * 
	 * @param updated
	 *            network to persist in the back-end
	 * @return updated NetworkDTO with any modifications made by the back-end
	 *         service
	 */
	public Optional<NetworkDTO> update(NetworkDTO network) {

		Assert.notNull(network, "Network required");
		Assert.hasText(network.getId(), "Network.id required");
		new LogEvent()
			.addProperty("event", "updateNetwork")
			.addProperty("network", network)
			.writeLogInfo(log);

		return Optional.ofNullable(networkServiceClient.update(network.getId(), network));
	}

	/**
	 * Create a new <code>Network</code> in the back-end service
	 * 
	 * @param the
	 *            network to create in the back-end
	 * @return created NetworkDTO with any modifications made by the back-end
	 *         service
	 */
	public Optional<NetworkDTO> create(NetworkDTO network) {

		Optional<NetworkDTO> o = Optional.ofNullable(networkServiceClient.create(network));
		if(o.isPresent()) {
			new LogEvent()
				.addProperty("event", "createNetwork")
				.addProperty("network", o.get())
				.writeLogInfo(log);
		}
		return o;
	}

	/**
	 * Get Network by id
	 * 
	 * @param the
	 *            id
	 * @return an Optional containing the Network or null
	 */
	public Optional<NetworkDTO> getById(String id) {
		NetworkDTO c = networkServiceClient.getOne(id);
		return Optional.ofNullable(c);
	}

	/**
	 * Return a List of Users who are managers of this Network
	 * 
	 * @param id
	 * @return
	 */
	public Resources<UserDTO> getManagers(@PathVariable("id") String id) {
		return networkServiceClient.getManagers(id);
	}
	
	/**
	 * Add user(s) as Manager to network
	 * 
	 * @param network
	 * @param usersToAdd
	 */
	public void addManagers(NetworkDTO network, List<UserDTO> usersToAdd) {
		new LogEvent()
			.addProperty("event", "addManagersToNetworks")
			.addProperty("networks", Collections.singletonList(network))
			.addProperty("users", usersToAdd)
			.writeLogInfo(log);

		StringBuilder userUris = new StringBuilder();
		usersToAdd.forEach(userToAdd -> {
			userUris.append(String.format("http://localhost:8001/users/%s\n", userToAdd.getId()));
		});
	
		networkServiceClient.addManagers(network.getId(), userUris.toString());
	}

	/**
	 * Remove user as Manager from network
	 * 
	 * @param network
	 * @param userToRemove
	 */
	public void removeManager(NetworkDTO network, UserDTO userToRemove) {
		new LogEvent()
			.addProperty("event", "removeManagersFromNetworks")
			.addProperty("networks", Collections.singletonList(network))
			.addProperty("users", userToRemove)
			.writeLogInfo(log);
		networkServiceClient.removeManager(network.getId(), userToRemove.getId());
	}
	
	/**
	 * Return a List of Users who are members of this Network
	 * 
	 * @param id
	 * @param page
	 * @param size
	 * @param sort
	 * @return
	 */
	public PagedResources<UserDTO> getMembers(String networkid, int page, int size, String sort) {
		return networkServiceClient.getMembers(networkid, page, size, sort);
	}

	/**
	 * Add user to networks
	 * 
	 * @param network
	 * @param usersToAdd
	 */
	public void addMembers(NetworkDTO network, Collection<UserDTO> usersToAdd) {
		new LogEvent()
			.addProperty("event", "addMembersToNetworks")
			.addProperty("networks", Collections.singletonList(network))
			.addProperty("users", usersToAdd)
			.writeLogInfo(log);
		StringBuilder userUris = new StringBuilder();
		usersToAdd.forEach(userToAdd -> {
			userUris.append(String.format("http://localhost:8001/users/%s\n", userToAdd.getId()));
		});
	
		networkServiceClient.addMembers(network.getId(), userUris.toString());
	}

	/**
	 * Remove user from network
	 * 
	 * @param network
	 * @param userToRemove
	 */
	public void leaveNetwork(NetworkDTO network, UserDTO userToRemove) {
		new LogEvent()
			.addProperty("event", "removeMembersFromNetworks")
			.addProperty("networks", Collections.singletonList(network))
			.addProperty("users", userToRemove)
			.writeLogInfo(log);
		networkServiceClient.removeMember(network.getId(), userToRemove.getId());
	}
	
	/**
	 * Return an Optional containing the owner of this Network or null
	 * 
	 * @param id
	 * @return
	 */
	public Optional<UserDTO> getOwner(String networkid) {
		UserDTO owner = networkServiceClient.getOwner(networkid); 
		return Optional.ofNullable(owner);
	}
	
	/**
	 * Return an Optional containing the parent of this Network or null
	 * 
	 * @param id
	 * @return
	 */
	public Optional<NetworkDTO> getParent(String id) {
		NetworkDTO parent = networkServiceClient.getParent(id); 
		return Optional.ofNullable(parent);
	}

}
