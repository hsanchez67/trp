package com.latch;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class NodalController {

    @RequestMapping("/nodal")
    public String index(Model model) {
        model.addAttribute("message", "Network Graph");
        return "nodal";
    }
}
