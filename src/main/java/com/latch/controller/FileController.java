package com.latch.controller;

import java.util.Collection;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.latch.domain.RemoteFileDTO;
import com.latch.service.RemoteFileService;

import lombok.extern.slf4j.Slf4j;

/**
 * example implementation of a File Controller
 * this is a proof of concept to show how to use the backend remote file service 
 * this implementation will be removed.
 * 
 * @author Brett
 *
 */
@Slf4j
@Controller
@RequestMapping({"/files"})
public class FileController {

	@Autowired
	private RemoteFileService remoteFileService;
	
	@RequestMapping
	public String getFiles(ModelMap model) {
		
		long start = System.currentTimeMillis();
		Collection<RemoteFileDTO> files = remoteFileService.getFiles();
		log.info("### files.size: " + files.size());
		model.addAttribute("remoteFiles", files);
		log.info("get files took " + (System.currentTimeMillis() - start) + "ms");
		return "files";
	}
	
	@RequestMapping("/delete/{id}")
	public String delete(@PathVariable String id) {
		long start = System.currentTimeMillis();
		remoteFileService.delete(id);
		log.info("delete took " + (System.currentTimeMillis() - start) + "ms");
		return "redirect:/files";
	}
	
	@RequestMapping("/download/{id}")
	public void downloadFile(@PathVariable String id, HttpServletResponse response, ModelMap map) {
		long start = System.currentTimeMillis();
		remoteFileService.downloadFile(id, response);
		log.info("download took " + (System.currentTimeMillis() - start) + "ms");
	}
	
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public String uploadFile(
			@RequestParam("theFile") MultipartFile file
			, @RequestParam(name = "ownerid", required = false, defaultValue = "system") String ownerid
			) {
		
		long start = System.currentTimeMillis();
		if(!file.isEmpty()) {
			String name = file.getOriginalFilename();
			try {
				remoteFileService.uploadFile(file, ownerid);
				log.info("upload took " + (System.currentTimeMillis() - start) + "ms");
				return "redirect:/files";
			} catch(Exception e) {
				return "upload failed for " + name + " => " + e.getMessage();
			}
		} else {
			return "The selected file was empty and could not be uploaded.";
		}
	}
}
