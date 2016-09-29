package com.latch;

import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.latch.domain.UserDTO;
import lombok.Data;

/**
 * Created by Hector on 2/4/2016.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Contacts {

    private Collection<UserDTO> contacts;
    private String message;
    private String id;
    private String introId;
    private String service;
    private int imports;
}
