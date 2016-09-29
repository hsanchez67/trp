package com.latch;

import java.security.Principal;
import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;

import com.latch.domain.CommunicationDTO;
import com.latch.domain.UserDTO;
import com.latch.security.TokenHandler;
import com.latch.service.CommunicationService;
import com.latch.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class IntroductionController {

	private static final Logger log = LoggerFactory.getLogger(IntroductionController.class);

	private final UserService userService;
	private final CommunicationService communicationService;
	private final TokenHandler tokenHandler;

	@Autowired
	public IntroductionController(UserService userService, CommunicationService communicationService, TokenHandler tokenHandler) {
		this.userService = userService;
		this.communicationService = communicationService;
		this.tokenHandler = tokenHandler;
	}

	// Read communications below
	@RequestMapping("/message/{commId}")
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
			model.addAttribute("readOnly", false);
		} else {
			log.info("Look for Message: User or Comm not found!");
		}

		return "components/Inbox/message";
	}

	/**
	 * This is the endpoint forwarded to by SecureAccessController(/secureAccess/{jwtToken:.+})
	 * for links from outside emails.
	 * It's apparently not being used in the email yet, but now that it's written, I'm leaving it for when it's needed.
	 * 
	 * @param jwtToken
	 * @param model
	 * @param principal
	 * @return
	 */
    @RequestMapping(value= "/introductionRequestByToken/{jwtToken:.+}")
    public String introductionRequestByToken(@PathVariable("jwtToken") String jwtToken, Model model, Principal principal) {
		String username = tokenHandler.parseUsernameFromToken(jwtToken);
		String commid = tokenHandler.parseClaimFromToken(jwtToken, "commid");

		log.debug("## /introductionRequestByToken/{}", jwtToken);
		log.debug("## username: {}", username);
		log.debug("## commid: {}", commid);

		UserDTO commUser = userService.getUserByEmail(username)
                .orElse(null);
		// If LinkOwner doesn't exist - go to home
		if(commUser == null) {
			log.debug("User Not Found: username={}", username);
			return "redirect:/home";
		}

		CommunicationDTO comm = communicationService.getCommunicationsById(commid);
		// If review doesn't exist - go to home
		if(comm == null) {
			log.debug("Introduction Not Found: commid={}", commid);
			return "redirect:/home";
		}

		// If Logged in and Link belongs to a different user - go to home
		if(principal != null && !principal.getName().equals(commUser.getEmail()) ) {
			log.debug("AuthenticatedUser different than IntroductionUser: principal={}, introductionUser={}", principal, commUser);
			return "redirect:/home";
		}

		if(!Arrays.asList("New","Read").contains(comm.getStatus())) {
			log.debug("Introduction already Read: commid={}", commid);
			return "redirect:/home";
		}
		
		// set session authenticate as review link user
		if(principal == null) {
			userService.setAuthenticated(commUser);
		}

		return introductionRequest(commid, model, principal, commUser);
    }

	@RequestMapping("/introductionRequest/{commId}")
	public String introductionRequest(@PathVariable("commId") String commId, Model model, Principal principal, UserDTO user) {
		log.info("Introduction Request communicationId={}", commId);
		model.addAttribute("commId", commId);
		CommunicationDTO comm = communicationService.getCommunicationsById(commId);

		user = (principal == null && user != null) ? user : userService.getUserByEmail(principal.getName())
				.orElse(null);
		
		if (comm != null && user != null) {
			model.addAttribute("user", user);
			model.addAttribute("comm", comm.getId());
			model.addAttribute("subjectUserId", comm.getSubjectUserId());
			model.addAttribute("readOnly", false);
		} else {
			log.info("Introduction Request:  Communication or User not found!");
		}
		return "components/Inbox/introductionRequest";
	}

	/**
	 * This is the endpoint forwarded to by SecureAccessController(/secureAccess/{jwtToken:.+})
	 * for links from outside emails.
	 * 
	 * @param jwtToken
	 * @param model
	 * @param principal
	 * @return
	 */
    @RequestMapping(value= "/referralRequestByToken/{jwtToken:.+}")
    public String referralRequestByToken(@PathVariable("jwtToken") String jwtToken, Model model, Principal principal) {
		String username = tokenHandler.parseUsernameFromToken(jwtToken);
		String commid = tokenHandler.parseClaimFromToken(jwtToken, "commid");

		UserDTO commUser = userService.getUserByEmail(username)
                .orElse(null);
		// If LinkOwner doesn't exist - go to home
		if(commUser == null) {
			log.debug("User Not Found: username={}", username);
			return "redirect:/home";
		}

		CommunicationDTO comm = communicationService.getCommunicationsById(commid);
		// If review doesn't exist - go to home
		if(comm == null) {
			log.debug("Referral Not Found: commid={}", commid);
			return "redirect:/home";
		}

		// If Logged in and Link belongs to a different user - go to home
		if(principal != null && !principal.getName().equals(commUser.getEmail()) ) {
			log.debug("AuthenticatedUser different than ReferralUser: principal={}, referralUser={}", principal, commUser);
			return "redirect:/home";
		}

		// TODO: what statuses should the link be viable for
		if(!Arrays.asList("New","Read").contains(comm.getStatus())) {
			log.debug("Referral already Read: commid={}", commid);
			return "redirect:/home";
		}

		// set session authenticate as review link user
		if(principal == null) {
			userService.setAuthenticated(commUser);
		}

		return referralRequest(commid, model, principal, commUser);
    }

    @RequestMapping("/referralRequest/{commId}")
	public String referralRequest(@PathVariable("commId") String commId, Model model, Principal principal, UserDTO user) {
		log.info("Referral request communicationId={}", commId);
		model.addAttribute("commId", commId);
		CommunicationDTO comm = communicationService.getCommunicationsById(commId);

		user = (principal == null && user != null) ? user : userService.getUserByEmail(principal.getName())
				.orElse(null);

		if (comm != null && user != null) {
			model.addAttribute("user", user);
			model.addAttribute("comm", comm.getId());
			model.addAttribute("subjectUserId", comm.getSubjectUserId());
			model.addAttribute("readOnly", false);
		} else {
			log.info("Referral Request:  Communication or User not found!");
		}
		return "components/Inbox/referralRequest";
	}

	// Create communications below
	@RequestMapping("/sendMessage")
	public String sendMessage(HttpServletRequest request, Model model, Principal principal) {
		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);
		if (user != null) {
			log.info("Send Message current user: " + user);
			model.addAttribute("user", user);
		} else {
			log.info("Send Message current user not found!");
		}
		return "components/Communications/sendMessage";
	}

	@RequestMapping("/sendMessageToGroup")
	public String sendMessageToGroup(HttpServletRequest request, Model model, @RequestParam("group") String group, Principal principal) {
		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);
		if (user != null) {
			log.info("Send Message current user: " + user);
			model.addAttribute("user", user);
			if (group != null) {
				model.addAttribute("groupId", group);
			}
		} else {
			log.info("Send Message current user not found!");
		}
		return "components/Communications/sendMessage";
	}

	@RequestMapping("/sendMessage/{commId}")
	public String sendMessageToUser(@PathVariable("commId") String commId, HttpServletRequest request, Model model, Principal principal) {
		log.info("Send message to user id: " + commId);
		model.addAttribute("profile", commId);

		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);

		if (user != null) {
			log.info("Login User: " + user);
			model.addAttribute("user", user);
		} else {
			log.info("Login User:  User not found!");
		}
		return "components/Communications/sendMessage";
	}

	@RequestMapping("/replyMessageToGroup")
	public String replyMessageToGroup(HttpServletRequest request, Model model, @RequestParam("comm") String commId, @RequestParam("group") String group, Principal principal) {
		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);
		if (user != null) {
			log.info("Reply Message To Group current user: " + user);
			model.addAttribute("user", user);
			if (group != null) {
				model.addAttribute("groupId", group);
			}
			if (commId != null) {
				CommunicationDTO comm = this.communicationService.getCommunicationsById(commId);
				if (comm!= null) {
					model.addAttribute("fromUserId", comm.getFromUserId());
					model.addAttribute("comm", comm.getId());
				} else {
					log.info("Communication not found!");
					return null;
				}
			}
		} else {
			log.info("Reply Message to Group current user not found!");
		}
		return "components/Communications/replyToMessage";
	}

	@RequestMapping("/replyToMessage/{commId}")
	public String replyToMessage(@PathVariable("commId") String commId, HttpServletRequest request, Model model, Principal principal) {
		log.info("Reply to message id: " + commId);

		CommunicationDTO comm = this.communicationService.getCommunicationsById(commId);
		if (comm!= null) {
			model.addAttribute("fromUserId", comm.getFromUserId());
			model.addAttribute("comm", comm.getId());
		} else {
			log.info("Communication not found!");
			return null;
		}

		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);

		if (user != null) {
			log.info("Login User: " + user);
			model.addAttribute("user", user);
		} else {
			log.info("Login User:  User not found!");
		}
		return "components/Communications/replyToMessage";
	}

	@RequestMapping("/introduction")
	public String index(Model model, Principal principal) {

		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);

		if (user != null) {
			log.info("Login User: " + user);
			model.addAttribute("user", user);
		} else {
			log.info("Login User:  User not found!");
		}
		return "components/Communications/introduction";
	}

	@RequestMapping("/introduction/{commId}")
	public String profile(@PathVariable("commId") String commId, HttpServletRequest request, Model model, Principal principal) {
		log.info("Profile id: " + commId);
		model.addAttribute("profile", commId);

		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);

		if (user != null) {
			log.info("Login User: " + user);
			model.addAttribute("user", user);
		} else {
			log.info("Login User:  User not found!");
		}

		return "components/Communications/introduction";
	}

	@RequestMapping("/introductionDraft/{commId}")
	public String introductionFromDraft(@PathVariable("commId") String commId, HttpServletRequest request, Model model, Principal principal) {
		log.info("Communication id: " + commId);
		model.addAttribute("message", commId);

		CommunicationDTO comm = this.communicationService.getCommunicationsById(commId);

		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);

		if (user != null) {
			log.info("Login User: " + user);
			model.addAttribute("user", user);
			model.addAttribute("commId", comm.getId());
		} else {
			log.info("Login User:  User not found!");
		}

		return "components/Communications/introductionDraft";
	}

	@RequestMapping("/referral")
	public String referral(Model model, Principal principal) {

		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);

		if (user != null) {
			log.info("Login User: " + user);
			model.addAttribute("user", user);
		} else {
			log.info("Login User:  User not found!");
		}
		return "components/Communications/referral";
	}

	@RequestMapping("/referral/{commId}")
	public String referralTo(@PathVariable("commId") String commId, HttpServletRequest request, Model model, Principal principal) {
		log.info("Profile id: " + commId);
		model.addAttribute("profile", commId);

		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);

		if (user != null) {
			log.info("Login User: " + user);
			model.addAttribute("user", user);
		} else {
			log.info("Login User:  User not found!");
		}

		return "components/Communications/referral";
	}

	@RequestMapping("/referralDraft/{commId}")
	public String referralFromDraft(@PathVariable("commId") String commId, HttpServletRequest request, Model model, Principal principal) {
		log.info("Communication id: " + commId);
		model.addAttribute("message", commId);

		CommunicationDTO comm = this.communicationService.getCommunicationsById(commId);

		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);

		if (user != null) {
			log.info("Login User: " + user);
			model.addAttribute("user", user);
			model.addAttribute("commId", comm.getId());
		} else {
			log.info("Login User:  User not found!");
		}

		return "components/Communications/referralDraft";
	}

}