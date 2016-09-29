package com.latch.logging;

import static net.logstash.logback.argument.StructuredArguments.keyValue;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;

public class LogEvent {

	private Map<String, Object> properties = new HashMap<>();
	
	public LogEvent() {}
	
	public LogEvent addProperty(String key, Object value) {
		properties.put(key, value);
		return this;
	}

	public void writeLogInfo(Logger log) {
		log.info("{}", keyValue("LogEvent", properties));
	}
	public void writeLogWarning(Logger log) {
		log.warn("{}", keyValue("LogEvent", properties));
	}
	public void writeLogError(Logger log) {
		log.error("{}", keyValue("LogEvent", properties));
	}

}
