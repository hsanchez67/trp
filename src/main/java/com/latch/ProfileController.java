package com.latch;

import javax.servlet.http.HttpServletRequest;

import com.latch.domain.NetworkDTO;
import com.latch.domain.UserDTO;
import com.latch.service.NetworkService;
import com.latch.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;
import java.util.Optional;

@Controller
public class ProfileController {

	private static final Logger log = LoggerFactory.getLogger(ProfileController.class);

	private final UserService userService;
	private final NetworkService networkService;

	@Autowired
	public ProfileController(UserService userService, NetworkService networkService) {
		this.userService = userService;
		this.networkService = networkService;
	}

	@RequestMapping("/profile")
	public String index(Model model) {
		return "components/Profile/profile";
	}

	@RequestMapping("/profile/{userId}")
	public String profile(@PathVariable("userId") String userId, HttpServletRequest request, Model model, Principal principal ) {
		log.info("User: " + userId);

		model.addAttribute("profile", userId);
		// Facebook app id
		long appId = 138763887098L;
		model.addAttribute("appId", appId);

		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);

		if (user != null) {
			log.info("Login User: " + user);
			model.addAttribute("user", user);
		} else {
			log.info("Login User:  User not found!");
		}

		return "components/Profile/profile";
	}

	@RequestMapping("/public/{name:.+}")
	public String personalPage(@PathVariable("name") String name, HttpServletRequest request, Model model, Principal principal) {
		log.info("Profile Name: " + name);

		Optional<UserDTO> user = userService.getUserByProfileName(name);
		if (user.isPresent() && user.get().getId() != null) {
			model.addAttribute("profile", user.get().getId());

			// Check to see if a user is logged in
			if (userService.isAuthenticated()) {
				log.info("A User is authenticated!!");
				UserDTO loggedInUser = userService.getUserByEmail(principal.getName())
						.orElse(null);
				if (loggedInUser != null) {
					log.info("Logged In User: " + loggedInUser.toString());
					model.addAttribute("currentUser", loggedInUser.getId());
				}
			} else {
				log.info("Logged In User is null");
			}

			// Facebook app id
			long appId = 138763887098L;
			model.addAttribute("appId", appId);
		} else {
			return "redirect:" + "/404";
		}

		return "components/Public/profile";
	}

	@RequestMapping(value= "/search")
	public String search(Model model, Principal principal) {
		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);

		if (user != null) {
			NetworkDTO network =  userService.getMyNetwork(user).get();
			log.info("Login User: " + user);
			log.info("My Network: " + network);
			model.addAttribute("user", user);
			if (network != null) {
				model.addAttribute("networkid", network.getId());
			} else {
				model.addAttribute("networkid", "");
			}
		} else {
			log.info("Login User:  User not found!");
		}

		return "components/Search/search";
	}


}