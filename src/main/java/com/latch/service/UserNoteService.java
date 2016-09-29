package com.latch.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.PagedResources;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.latch.domain.UserNoteDTO;
import com.latch.logging.LogEvent;
import com.latch.service.feign.UserNoteServiceClient;

import feign.FeignException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserNoteService {

	private final UserNoteServiceClient userNoteServiceClient;

	@Autowired
	public UserNoteService(UserNoteServiceClient userNoteServiceClient) {
		this.userNoteServiceClient = userNoteServiceClient;
	}
	

	/**
	 * search for a list of UserNotess matching submitted name, professions, city & state
	 * 
	 * @param ownerUserId
	 * @param name
	 * @param profession
	 * @param city
	 * @param state
	 * @param page
	 * @param size
	 * @param sort
	 * @return
	 */
	public PagedResources<UserNoteDTO> findUsers(String ownerUserId, String name, String profession, String city, String state, int page, int size, String sort) {
		Assert.notNull(ownerUserId, "ownerUserId required.");
		return userNoteServiceClient.findUsers(ownerUserId, name, profession, city, state, page, size, sort);
	}


	/**
	 * fulltext search across firstName, lastName, businessName, businessAddress, etc...
	 * 		results sorted by relevance
	 * 
	 * @param ownerUserId
	 * @param keyword
	 * @param page
	 * @param size
	 * @return
	 */
	public PagedResources<UserNoteDTO> searchByKeyword(String ownerUserId, String keyword, int page, int size) {
		Assert.notNull(ownerUserId, "ownerUserId required.");
		Assert.notNull(keyword, "keyword required.");
		return userNoteServiceClient.searchByKeyword(ownerUserId, keyword, page, size);
	}

	/**
	 * Proxy to update <code>UserNote</code> in backend service
	 * 
	 * @param
	 *            userNote to persist in the backend
	 * @return updated UserNoteDTO with any modifications made by the backend
	 *         service
	 */
	public Optional<UserNoteDTO> update(UserNoteDTO userNote) {

		Assert.notNull(userNote, "userNote required");
		Assert.hasText(userNote.getId(), "userNote.id required");
		new LogEvent()
			.addProperty("event", "updateUserNote")
			.addProperty("userNote", userNote)
			.writeLogInfo(log);

		return Optional.ofNullable(userNoteServiceClient.update(userNote.getId(), userNote));
	}

	/**
	 * Create a new <code>UserNote</code> in the backend service
	 * 
	 * @param
	 *            userNote to create in the backend
	 * @return created UserDTO with any modifications made by the backend
	 *         service
	 */
	public Optional<UserNoteDTO> create(UserNoteDTO userNote) {

		Assert.notNull(userNote, "userNote required");
		Assert.hasText(userNote.getOwnerUserId(), "userNote.ownerUserId required");
		Assert.hasText(userNote.getTargetUserId(), "userNote.targetUserId required");
	//	Assert.hasText(userNote.getContent(), "userNote.content required");
		
		try {
			boolean alreadyExists = userNoteServiceClient
					.findOneByOwnerUserIdAndTargetUserId(userNote.getOwnerUserId(), userNote.getTargetUserId()) != null;
			if (alreadyExists) {
				String message = String.format("UserNote for ownerUserId=%s & targetUserId=%s already exists.",
						userNote.getOwnerUserId(), userNote.getTargetUserId());
				log.debug(message);
				throw new IllegalArgumentException(message);
			}
		} catch(FeignException e) {
			// 404 userNote not found. all is good.
		}
		new LogEvent()
			.addProperty("event", "createUserNote")
			.addProperty("userNote", userNote)
			.writeLogInfo(log);

		return Optional.ofNullable(userNoteServiceClient.create(userNote));
	}

	/**
	 * Get UserNote by ownerId and targetId
	 * 
	 * @param
	 *            ownerId
	 *            targetId
	 * @return an Optional containing the UserNote or null
	 */
	public Optional<UserNoteDTO> getByOwnerIdAndTargetId(String ownerId, String targetId) {
		UserNoteDTO c = userNoteServiceClient.findOneByOwnerUserIdAndTargetUserId(ownerId, targetId);
		return Optional.ofNullable(c);
	}

	/**
	 * Get UserNote by id
	 * 
	 * @param
	 *            id
	 * @return an Optional containing the UserNote or null
	 */
	public Optional<UserNoteDTO> getById(String id) {
		UserNoteDTO c = userNoteServiceClient.findById(id);
		return Optional.ofNullable(c);
	}

	/**
	 * Delete UserNote
	 * 
	 * @param
	 *            userNote
	 */
	public void delete(UserNoteDTO userNote) {
		Assert.notNull(userNote, "userNote required");
		Assert.hasText(userNote.getId(), "userNote.id required");
		new LogEvent()
			.addProperty("event", "deleteUserNote")
			.addProperty("userNote", userNote)
			.writeLogInfo(log);

		userNoteServiceClient.delete(userNote.getId());
	}
}
