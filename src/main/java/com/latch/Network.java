package com.latch;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.latch.domain.UserDTO;
import lombok.Data;
import org.springframework.hateoas.Resources;

/**
 * Created by Hector on 2/24/2016.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Network {
    private UserDTO user;
    private Resources<UserDTO> children;

}
