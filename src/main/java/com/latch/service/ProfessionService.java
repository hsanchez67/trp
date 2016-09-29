package com.latch.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.PagedResources;
import org.springframework.stereotype.Service;

import com.latch.domain.ProfessionDTO;
import com.latch.service.feign.ProfessionServiceClient;

@Service
public class ProfessionService {

	private final ProfessionServiceClient professionServiceClient;

	@Autowired
	public ProfessionService(ProfessionServiceClient professionServiceClient) {
		this.professionServiceClient = professionServiceClient;
	}

	/**
	 * search for Profession where title contains the provided substring case-insensitive
	 * 
	 * @param page	0 index
	 * @param size	records per page
	 * @param sort	examples:
	 * 				sort=title			to sort by title ascending
	 * 				sort=title,desc		to sort by title descending
	 * @return
	 */
	public PagedResources<ProfessionDTO> findAll(int page, int size, String sort) {
		return professionServiceClient.getAll(page, size, sort);
		
	}

	/**
	 * Get Profession by id
	 * 
	 * @param
	 *            id
	 * @return an Optional containing the Profession or null
	 */
	public Optional<ProfessionDTO> getProfessionById(String id) {
		ProfessionDTO c = professionServiceClient.getOne(id);
		return Optional.ofNullable(c);
	}

	/**
	 * search for Profession where title contains the provided substring case-insensitive
	 * 
	 * @param substr	case-insensitive substring to search for
	 * @param page	0 index
	 * @param size	records per page
	 * @param sort	examples:
	 * 				sort=title			to sort by title ascending
	 * 				sort=title,desc		to sort by title descending
	 * @return
	 */
	public PagedResources<ProfessionDTO> findByTitleContainsIgnoreCase(String substr, int page, int size, String sort) {
		return professionServiceClient.findByTitleContainsIgnoreCase(substr, page, size, sort);
	}
}
