package com.latch;

import com.latch.domain.CommunicationDTO;
import com.latch.domain.NetworkDTO;
import com.latch.domain.ReviewDTO;
import com.latch.security.TokenHandler;
import com.latch.service.CommunicationService;
import com.latch.service.NetworkService;
import com.latch.service.ReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.PagedResources;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.latch.domain.UserDTO;
import com.latch.service.UserService;

import javax.servlet.http.HttpServletRequest;

import java.security.Principal;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

@Controller
public class HomeController {

	private static final Logger log = LoggerFactory.getLogger(HomeController.class);

	private final UserService userService;
	private final CommunicationService communicationService;
	private final NetworkService networkService;
	private final ReviewService reviewService;
	private final TokenHandler tokenHandler;
	
	@Autowired
	public HomeController(UserService userService, CommunicationService communicationService, NetworkService networkService, ReviewService reviewService, TokenHandler tokenHandler) {
		this.userService = userService;
		this.communicationService = communicationService;
		this.networkService = networkService;
		this.reviewService = reviewService;
		this.tokenHandler = tokenHandler;
	}
	
	@RequestMapping(value = "/index")
	public String index() throws Exception {
		return "latch";
	}

	@RequestMapping(value = "/")
	public String latch() throws Exception {
		return "latch";
	}

	@RequestMapping("/oauth")
	public String oauth() {
		return "oauth";
	}

	@RequestMapping(value = "/privacy")
	public String privacy() throws Exception {
		return "privacy";
	}

	@RequestMapping(value = "/home")
	public String home(Model model, Principal principal) {

		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);

		if (user != null) {
			log.info("Login User: " + user.toString());
			model.addAttribute("user", user);
			// Get stats
			// All communications from you (Referral and Introductions)
			long allActivity = 0;
			PagedResources<CommunicationDTO> intros = communicationService.getCommunicationsFrom(user.getId(), "Introduction", 0, 99, "desc");
			allActivity = allActivity + (intros != null && intros.getMetadata() != null ? intros.getMetadata().getTotalElements() : 0);
			PagedResources<CommunicationDTO> referrals = communicationService.getCommunicationsFrom(user.getId(), "Referral", 0, 99, "desc");
			allActivity = allActivity + (referrals != null && referrals.getMetadata() != null ? referrals.getMetadata().getTotalElements() : 0);
			model.addAttribute("allActivity", allActivity);
			// Number of contacts in your network
			long yourNetwork;
			NetworkDTO network = userService.getMyNetwork(user).get();
			PagedResources<UserDTO> users = networkService.getMembers(network.getId(), 0, 999, "");
			yourNetwork = users.getMetadata().getTotalElements();
			model.addAttribute("yourNetwork", yourNetwork);
			// Average Overall Rarting
			double avgRating = 0.0;
			PagedResources<ReviewDTO> reviews = reviewService.findCompletedByReviewedUserId(user.getId(), 0, 99, "desc");
			if (reviews.getMetadata().getTotalElements() > 0) {
				for (ReviewDTO review : reviews.getContent()) {
					avgRating = avgRating + review.getOverallRating();
				}
				avgRating = avgRating / reviews.getMetadata().getTotalElements();
			}
			NumberFormat nf = new DecimalFormat("##.#");
			model.addAttribute("avgRating", nf.format(avgRating));
			// Num of New Communications that haven't been read
			long newMessages = 0;
			List<String> in = new ArrayList<>();
			in.add("New");
			PagedResources<CommunicationDTO> messages = this.communicationService.findByToUserIdAndStatusIn(user.getId().toString(), in, 0, 20, "created,desc");
			newMessages = (messages != null && messages.getMetadata() != null ? messages.getMetadata().getTotalElements() : 0);
			model.addAttribute("newMessages", newMessages);
		} else {
			log.info("Login User:  User not found!");
		}
		return "components/Home/home";
	}

	@RequestMapping(value = "/settings")
	public String settings(Model model, Principal principal) {
		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);
		
		if(user != null) {
			log.info("Login USer: " + user);
			model.addAttribute("user", user);
		} else {
			log.info("Login User:  User not found!");
		}
		return "components/Settings/settings";
	}

	@RequestMapping(value = "/videos")
	public String videos(Model model, Principal principal) {
		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);

		if(user != null) {
			log.info("Login USer: " + user);
			model.addAttribute("user", user);
		} else {
			log.info("Login User:  User not found!");
		}
		return "components/Help/videos";
	}

	@RequestMapping(value = "/register")
	public String register() {
		return "components/RegisterPage/register";
	}

	@RequestMapping(value = "/registerSuccess")
	public String registerSuccess() {
		return "components/RegisterPage/registerSuccess";
	}

	@RequestMapping(value = "/login")
	public String login() {
		return "components/LoginPage/login";
	}

	@RequestMapping("/history/{userId}")
	public String profile(@PathVariable("userId") String userId, HttpServletRequest request, Model model, Principal principal) {
		log.info("User: " + userId);

		model.addAttribute("profile", userId);

		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);

		if (user != null) {
			log.info("Login User: " + user);
			model.addAttribute("user", user);
		} else {
			log.info("Login User:  User not found!");
		}

		return "components/Profile/history";
	}

	@RequestMapping(value = "/forgot")
	public String forgot() {
		return "components/Forgot/forgot";
	}

	@RequestMapping(value = "/forgotSuccess")
	public String forgotSuccess() {
		return "components/Forgot/forgotSuccess";
	}

	@RequestMapping(value = "/verifyHelp")
	public String verifyHelp() {
		return "components/RegisterPage/verifyHelp";
	}

	@RequestMapping(value = "/verifyHelpSuccess")
	public String verifyHelpSuccess() {
		return "components/RegisterPage/verifyHelpSuccess";
	}

	@RequestMapping(value = "/forgotPassword/{jwtToken:.+}")
	public String reset(@PathVariable("jwtToken") String jwtToken, HttpServletRequest request, Model model) {
		String username = tokenHandler.parseUsernameFromToken(jwtToken);
		log.info("ForgotPassword: " +username);
		UserDTO resetUser = userService.getUserByEmail(username).orElse(null);
		if (resetUser != null) {
			log.info("Reset User: " + resetUser.getId());
			if (resetUser.getAuthenticated() == null || !resetUser.getAuthenticated()) {
				resetUser.setAuthenticated(true);
				userService.update(resetUser);
			}
		} else if (resetUser == null) {
			log.debug("User Not Found: username={}", username);
			return "redirect:/home";
		}
		model.addAttribute("user", resetUser);
		return "components/Reset/reset";
	}
	@RequestMapping(value = "/resetSuccess")
	public String resetSuccess() {
		return "components/Reset/resetSuccess";
	}

	@RequestMapping(value = "/authenticate/{jwtToken:.+}")
	public String authenticate(@PathVariable("jwtToken") String jwtToken, HttpServletRequest request, Model model) {
		String username = tokenHandler.parseUsernameFromToken(jwtToken);
		log.info("Authenticate: " +username);
		UserDTO user = userService.getUserByEmail(username).orElse(null);
		log.info("Authenticate User: " + user.getId());
		if (user == null) {
			log.debug("User Not Found: username={}", username);
			return "redirect:components/RegisterPage/authenticateFailure";
		}
		user.setAuthenticated(true);
		userService.update(user);
		if (user.getPassword() == null || user.getPassword().isEmpty()) {
			return "redirect:/forgotPassword/" +jwtToken;
		}
		return "components/RegisterPage/authenticate";
	}
}