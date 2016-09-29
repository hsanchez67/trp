package com.latch;

import com.latch.domain.UserDTO;
import com.latch.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;

@Controller
public class MyShortListController {

    private static final Logger log = LoggerFactory.getLogger(HomeController.class);

    private final UserService userService;

    @Autowired
    public MyShortListController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping("/myShortList")
    public String index(Model model, Principal principal) {
        UserDTO user = userService.getUserByEmail(principal.getName())
                .orElse(null);

        if (user != null) {
            model.addAttribute("user", user);
        } else {
            log.info("Login User:  User not found!");
        }

        return "components/MyShortList/myShortList";
    }

    @RequestMapping("/myShortList/{groupId:.+}")
    public String profile(@PathVariable("groupId") String groupId, HttpServletRequest request, Model model, Principal principal) {
        log.info("Group id: " + groupId);

        model.addAttribute("groupId", groupId);
        UserDTO user = userService.getUserByEmail(principal.getName())
                .orElse(null);

        if (user != null) {
            model.addAttribute("user", user);
        } else {
            log.info("Login User:  User not found!");
        }


        return "components/MyShortList/myShortList";
    }
}
