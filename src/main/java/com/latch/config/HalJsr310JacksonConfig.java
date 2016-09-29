package com.latch.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class HalJsr310JacksonConfig {

    private static final String SPRING_HATEAOS_OBJECT_MAPPER = "_halObjectMapper";
    
    @Autowired
    @Qualifier(SPRING_HATEAOS_OBJECT_MAPPER)
    private ObjectMapper springHateaosObjectMapper;
    
    @Autowired
    private Jackson2ObjectMapperBuilder springBootObjectMapperBuilder;
    
    @Bean(name = "objectMapper")
    ObjectMapper objectMapper() {
    	this.springBootObjectMapperBuilder.configure(this.springHateaosObjectMapper);
    	
    	return springHateaosObjectMapper;
    }
}
