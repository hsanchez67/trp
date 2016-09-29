package com.latch.controller;

import java.lang.reflect.InvocationTargetException;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.latch.domain.UserDTO;
import com.latch.service.feign.UserServiceClient;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/update")
public class EntityChangeController {

	private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	private final UserServiceClient userServiceClient;
	
	@Autowired
	public EntityChangeController(UserServiceClient userServiceClient) {
		this.userServiceClient = userServiceClient;
	}
	
	@RequestMapping(value = "/users/{id}", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public UserDTO updateUser(@PathVariable("id") String id, @RequestBody Map<String, String> properties) {
		log.info("Updating User id: " + id + " properties: " + properties);
		
		UserDTO user = userServiceClient.getOne(id);
		if(user == null) {
			throw new RuntimeException("User " + id + " not found.");
		}
		log.debug("updateUser Before: " + user);
		properties.entrySet().stream()
		.filter( e -> e.getValue() != null)
		.forEach( e -> {
			try {
				if("password".equals(e.getKey()))
						
				BeanUtils.setProperty(user, e.getKey(), 
						"password".equals(e.getKey())? encoder.encode(e.getValue()):e.getValue());
			} catch(InvocationTargetException | IllegalAccessException ex) {
				log.error(String.format("Update property [%s] for type User failed", e.getKey()), ex);
			}
		});
		log.debug("updateUser After: " + user);
		return userServiceClient.update(id, user);
	}
	
	
}
