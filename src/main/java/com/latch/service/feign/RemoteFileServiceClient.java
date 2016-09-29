package com.latch.service.feign;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.hateoas.PagedResources;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.latch.domain.RemoteFileDTO;
import com.latch.service.feign.fallback.RemoteFileServiceClientFallbackHandler;

/**
 * Feign Client used as a proxy to access endpoints of the remote-file-service
 * 
 * @author Brett
 *
 */
@FeignClient(name = "fs-file-service", decode404 = true, fallback = RemoteFileServiceClientFallbackHandler.class)
public interface RemoteFileServiceClient {

	@RequestMapping(method = RequestMethod.GET, value = "/remoteFiles")
	public PagedResources<RemoteFileDTO> getRemoteFiles();

	@RequestMapping(method = RequestMethod.GET, value = "/remoteFiles/search/findByOwnerid")
	public PagedResources<RemoteFileDTO> getRemoteFilesByOwnerid(@RequestParam(value="ownerid") String ownerid);

	@RequestMapping(method = RequestMethod.DELETE, value = "/remoteFiles/{id}")
	public void delete(@PathVariable("id") String id);
}
