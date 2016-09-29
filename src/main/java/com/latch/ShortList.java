package com.latch;

import com.latch.domain.UserDTO;
import org.springframework.hateoas.Resources;

/**
 * Created by Hector on 2/24/2016.
 */
public class ShortList {
    private UserDTO user;
    private Resources<UserDTO> children;

    public ShortList() {}

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public Resources<UserDTO> getChildren() {
        return children;
    }

    public void setChildren(Resources<UserDTO> children) {
        this.children = children;
    }

    @Override
    public String toString() {
        return "ShortList{" +
                "user=" + user +
                ", children=" + children +
                '}';
    }
}
