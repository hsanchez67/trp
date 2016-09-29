package com.latch.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.latch.domain.RemoteFileDTO;
import com.latch.logging.LogEvent;
import com.latch.service.feign.RemoteFileServiceClient;
import com.netflix.hystrix.HystrixRequestLog;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;

import lombok.extern.slf4j.Slf4j;

/**
 * local facade to access backend remote file service.
 * 
 * @author Brett
 *
 */
@Slf4j
@Service
public class RemoteFileService {

	private final RemoteFileServiceClient remoteFileClient;
	private final RestTemplate restTemplate;
	
	@Autowired
	public RemoteFileService(RemoteFileServiceClient remoteFileClient, RestTemplate restTemplate) {
		this.remoteFileClient = remoteFileClient;
		this.restTemplate = restTemplate;
	}
	
	@HystrixCommand(fallbackMethod = "getDefaultFiles")
	public Collection<RemoteFileDTO> getFiles() {
		return remoteFileClient.getRemoteFiles().getContent();
	}

	@HystrixCommand(fallbackMethod = "getDefaultFiles")
	public Collection<RemoteFileDTO> getFilesByOwnerid(String ownerid) {
		return remoteFileClient.getRemoteFilesByOwnerid(ownerid).getContent();
	}

	public Collection<RemoteFileDTO> getDefaultFiles() {
		Throwable t = HystrixRequestLog.getCurrentRequest().getAllExecutedCommands().iterator().next().getFailedExecutionException();
		log.warn("Circuit breaker tripped for getting files.", t);
		return new ArrayList<RemoteFileDTO>();
	}
	public Collection<RemoteFileDTO> getDefaultFiles(String ownerid) {
		Throwable t = HystrixRequestLog.getCurrentRequest().getAllExecutedCommands().iterator().next().getFailedExecutionException();
		log.warn("Circuit breaker tripped for getting files.", t);
		return new ArrayList<RemoteFileDTO>();
	}
	
	public void delete(String id) {
		new LogEvent()
			.addProperty("event", "deleteFile")
			.addProperty("id", id)
			.writeLogInfo(log);

		remoteFileClient.delete(id);
	}
	
	public void downloadFile(String id, HttpServletResponse response) {
		
		long start = System.currentTimeMillis();
		HttpHeaders headers = new HttpHeaders();
		ResponseEntity<byte[]> responseEntity = restTemplate.exchange("http://FS-FILE-SERVICE/remoteFiles/export/{id}",
				HttpMethod.GET, new HttpEntity<byte[]>(headers), byte[].class, id);
		
		response.setContentType(responseEntity.getHeaders().getContentType().toString());
		response.setHeader("Content-Disposition", responseEntity.getHeaders().getFirst("Content-Disposition"));
		try (ByteArrayInputStream inputStream = new ByteArrayInputStream(responseEntity.getBody())) {
			IOUtils.copy(inputStream, response.getOutputStream());
			response.flushBuffer();
		} catch(IOException e) {
			log.info("Error writing file to output stream. id was '{}'", id, e);
			throw new RuntimeException("IOError writing file to output stream");
		}
		log.info("download took " + (System.currentTimeMillis() - start));
	}
	
	public String uploadFile(MultipartFile file, String ownerid) throws IOException {
		
		String name = file.getOriginalFilename();
		String contentType = file.getContentType();
		byte[] bytes = file.getBytes();
		HttpHeaders clientHeaders = new HttpHeaders();
		clientHeaders.setContentType(MediaType.parseMediaType(contentType));
		clientHeaders.set("Content-Disposition", "attachment: filename=" + name);
		clientHeaders.set("ownerid", ownerid);
		
		HttpEntity<byte[]> entity = new HttpEntity<byte[]>(bytes, clientHeaders);
		ResponseEntity<String> result =  restTemplate.exchange("http://FS-FILE-SERVICE/remoteFiles/import", 
				HttpMethod.POST, entity, String.class);
		String fileid = new String(result.getBody().getBytes());
		new LogEvent()
			.addProperty("event", "uploadFile")
			.addProperty("ownerid", ownerid)
			.addProperty("filename", name)
			.addProperty("fileid", fileid)
			.writeLogInfo(log);
		return fileid;
	}
}
