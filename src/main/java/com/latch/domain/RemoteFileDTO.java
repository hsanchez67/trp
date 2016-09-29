package com.latch.domain;

import java.util.Date;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
 * Object used to represent the metadata associated with a file stored in the remote file service.
 * 
 * id:			the generated id used to access the file in the remove file service
 * name:		the original file name
 * createDate:	the Date the file was stored in the remote file service
 * 
 * @author Brett
 *
 */
@JsonIgnoreProperties(ignoreUnknown=true)
@Data
public class RemoteFileDTO {

	private final @Id String id = null;
	private final String name = null;
	private final Date createDate = null;
	private final String ownerid = null;
}
