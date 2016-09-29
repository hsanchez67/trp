package com.latch.domain;

import org.apache.commons.lang3.StringUtils;

public abstract class AbstractLatchSocialDTO implements LatchSocialDTO {

	public boolean validate() {
		return StringUtils.isNotBlank(getUserId());
	}
}

