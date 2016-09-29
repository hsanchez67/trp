package com.latch.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by Hector on 5/8/2016.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class TasksDTO {
    private CommunicationDTO comm;
    private UserDTO user;
    private UserDTO subjectUser;
}
