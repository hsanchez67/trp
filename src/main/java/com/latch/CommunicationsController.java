package com.latch;

import com.latch.domain.CommunicationDTO;
import com.latch.domain.UserDTO;
import com.latch.service.CommunicationService;
import com.latch.service.RemoteFileService;
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
import javax.servlet.http.HttpServletResponse;

/**
 * Created by Hector on 4/25/2016.
 */
@Controller
public class CommunicationsController {
    private static final Logger log = LoggerFactory.getLogger(IntroductionController.class);

    private final UserService userService;
    private final CommunicationService communicationService;
    private final RemoteFileService remoteFileService;

    @Autowired
    public CommunicationsController(UserService userService, CommunicationService communicationService, RemoteFileService remoteFileService) {
        this.userService = userService;
        this.communicationService = communicationService;
        this.remoteFileService = remoteFileService;
    }

    @RequestMapping(value= "/inbox")
    public String inbox(Model model, Principal principal) {
        UserDTO user = userService.getUserByEmail(principal.getName())
                .orElse(null);

        if (user != null) {
            log.info("Login User: " + user);
            model.addAttribute("user", user);
        } else {
            log.info("Login User:  User not found!");
        }

        return "components/Inbox/inbox";
    }

    @RequestMapping(value= "/myq")
    public String myq(Model model, Principal principal) {
        UserDTO user = userService.getUserByEmail(principal.getName())
                .orElse(null);

        if (user != null) {
            log.info("Login User: " + user);
            model.addAttribute("user", user);
        } else {
            log.info("Login User:  User not found!");
        }

        return "components/Inbox/myq";
    }

    @RequestMapping(value= "/myqplus")
    public String myqplus(Model model, Principal principal) {
        UserDTO user = userService.getUserByEmail(principal.getName())
                .orElse(null);

        if (user != null) {
            log.info("Login User: " + user);
            model.addAttribute("user", user);
        } else {
            log.info("Login User:  User not found!");
        }

        return "components/Inbox/myqplus";
    }

    @RequestMapping(value= "/archive")
    public String archive(Model model, Principal principal) {
        UserDTO user = userService.getUserByEmail(principal.getName())
                .orElse(null);

        if (user != null) {
            log.info("Login User: " + user);
            model.addAttribute("user", user);
        } else {
            log.info("Login User:  User not found!");
        }

        return "components/Inbox/archive";
    }

    @RequestMapping(value= "/deleted")
    public String deleted(Model model, Principal principal) {
        UserDTO user = userService.getUserByEmail(principal.getName())
                .orElse(null);

        if (user != null) {
            log.info("Login User: " + user);
            model.addAttribute("user", user);
        } else {
            log.info("Login User:  User not found!");
        }

        return "components/Inbox/deleted";
    }

    @RequestMapping(value= "/sent")
    public String sent(Model model, Principal principal) {
        UserDTO user = userService.getUserByEmail(principal.getName())
                .orElse(null);

        if (user != null) {
            log.info("Login User: " + user);
            model.addAttribute("user", user);
        } else {
            log.info("Login User:  User not found!");
        }

        return "components/Inbox/sent";
    }

    @RequestMapping("/messageSent/{commId}")
    public String openMessage(@PathVariable("commId") String commId, HttpServletRequest request, Model model, Principal principal) {
        log.info("Message id: " + commId);
        model.addAttribute("message", commId);

        UserDTO user = userService.getUserByEmail(principal.getName())
                .orElse(null);

        CommunicationDTO comm = communicationService.getCommunicationsById(commId);

        if (comm != null && user != null) {
            log.info("Communication found!");
            model.addAttribute("user", user);
            model.addAttribute("fromUser", comm.getFromUserId());
            model.addAttribute("comm", commId);
            model.addAttribute("readOnly", true);
            model.addAttribute("closeUrl", "sent");
        } else {
            log.info("Look for Message: User or Comm not found!");
        }

        return "components/Inbox/message";
    }

    @RequestMapping("/introductionRequestSent/{commId}")
    public String introductionRequest(@PathVariable("commId") String commId, HttpServletRequest request, Model model, Principal principal) {
        log.info("Introduction Request comm id: " + commId);
        model.addAttribute("commId", commId);
        CommunicationDTO comm = communicationService.getCommunicationsById(commId);

        UserDTO user = userService.getUserByEmail(principal.getName())
                .orElse(null);

        if (comm != null && user != null) {
            model.addAttribute("user", user);
            model.addAttribute("comm", comm.getId());
            model.addAttribute("subjectUserId", comm.getSubjectUserId());
            model.addAttribute("readOnly", true);
            model.addAttribute("closeUrl", "sent");
        } else {
            log.info("Introduction Request:  Communication or User not found!");
        }
        return "components/Inbox/introductionRequest";
    }

    @RequestMapping(value = "/downloadFile/{id}")
    public void downloadFile(@PathVariable("id") String id, HttpServletResponse response) {
        log.info("Download File ID: " + id);

        if (id != null) {
            long start = System.currentTimeMillis();
            this.remoteFileService.downloadFile(id, response);
            log.info("download took " + (System.currentTimeMillis() - start) + "ms");
        }
    }

    @RequestMapping("/referralRequestSent/{commId}")
    public String referralRequest(@PathVariable("commId") String commId, HttpServletRequest request, Model model, Principal principal) {
        log.info("Referral request comm id: " + commId);
        model.addAttribute("commId", commId);
        CommunicationDTO comm = communicationService.getCommunicationsById(commId);

        UserDTO user = userService.getUserByEmail(principal.getName())
                .orElse(null);

        if (comm != null && user != null) {
            model.addAttribute("user", user);
            model.addAttribute("comm", comm.getId());
            model.addAttribute("subjectUserId", comm.getSubjectUserId());
            model.addAttribute("readOnly", true);
            model.addAttribute("closeUrl", "sent");
        } else {
            log.info("Referral Request:  Communication or User not found!");
        }
        return "components/Inbox/referralRequest";
    }

}
