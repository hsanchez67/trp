package com.latch.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.embedded.undertow.UndertowBuilderCustomizer;
import org.springframework.boot.context.embedded.undertow.UndertowEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import io.undertow.Undertow.Builder;

@Configuration
@Profile("localdev")
public class MultiConnectionSupport {

	@Value("${server.port}")
	private int serverPort;
	
	@Value("${server.http.port}")
	private int httpServerPort;
	
	@Bean
    public UndertowEmbeddedServletContainerFactory embeddedServletContainerFactory() {
    	UndertowEmbeddedServletContainerFactory factory = new UndertowEmbeddedServletContainerFactory();
    	factory.addBuilderCustomizers(new UndertowBuilderCustomizer() {
			
			@Override
			public void customize(Builder builder) {
				builder.addHttpListener(httpServerPort,  "0.0.0.0");
			}
		});
    	return factory;
    }
}
