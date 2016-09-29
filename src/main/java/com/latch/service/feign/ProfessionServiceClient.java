package com.latch.service.feign;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.hateoas.PagedResources;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.latch.domain.ProfessionDTO;
import com.latch.service.feign.fallback.ProfessionServiceClientFallbackHandler;

/**
 * This is a proxy client to the user-service backend.
 * 
 * 
 * @author Brett
 */
@FeignClient(name = "user-service", decode404 = true, fallback = ProfessionServiceClientFallbackHandler.class )
public interface ProfessionServiceClient {

	@RequestMapping(value = "/professions", method = RequestMethod.GET)
	PagedResources<ProfessionDTO> getAll(@RequestParam("page") int page, @RequestParam("size") int size,
			@RequestParam("sort") String sort);

	@RequestMapping(value = "/professions/{id}", method = RequestMethod.GET)
	ProfessionDTO getOne(@PathVariable("id") String id);

	@RequestMapping(value = "/professions/search/findByTitleContainsIgnoreCase", method = RequestMethod.GET)
	PagedResources<ProfessionDTO> findByTitleContainsIgnoreCase(@RequestParam("substr") String substr,
			@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("sort") String sort);

}
