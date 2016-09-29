package com.latch.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(value={"hibernateLazyInitializer", "handler"}, ignoreUnknown=true)
@Data
@NoArgsConstructor(access=lombok.AccessLevel.PRIVATE, force=true) // JPA
@AllArgsConstructor
public class ProfessionDTO {

	private final String id;
	private final String title;
}
