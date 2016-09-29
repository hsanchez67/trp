package com.latch;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RegistrationController {

    @RequestMapping("/registration")
    public String registration(Model model) {
        model.addAttribute("message", "Welcome to Latch!");
        return "registration";
    }
}
