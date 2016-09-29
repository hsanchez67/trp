package com.latch;

import com.latch.domain.ReviewDTO;
import com.latch.domain.UserDTO;
import com.latch.security.TokenHandler;
import com.latch.service.ReviewService;
import com.latch.service.UserService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

/**
 * Created by Hector on 6/16/2016.
 */

@Slf4j
@Controller
public class ReviewsController {

    private final UserService userService;
    private final ReviewService reviewService;
    private final TokenHandler tokenHandler;

    @Autowired
    public ReviewsController(UserService userService, ReviewService reviewService, TokenHandler tokenHandler) {
        this.userService = userService;
        this.reviewService = reviewService;
        this.tokenHandler = tokenHandler;
    }

    @RequestMapping(value= "/reviews")
    public String reviews(Model model, Principal principal) {
        UserDTO user = userService.getUserByEmail(principal.getName())
                .orElse(null);

        if (user != null) {
            log.info("User: " + user);
            model.addAttribute("user", user);
        } else {
            log.info("Reviews User:  User not found!");
        }

        return "components/Reviews/reviews";
    }


    @RequestMapping(value= "/reviewRequestByToken/{jwtToken:.+}")
    public String reviewRequestByToken(@PathVariable("jwtToken") String jwtToken, Model model, Principal principal) {
		String username = tokenHandler.parseUsernameFromToken(jwtToken);
		String reviewid = tokenHandler.parseClaimFromToken(jwtToken, "reviewid");

		UserDTO reviewUser = userService.getUserByEmail(username)
                .orElse(null);
		// If LinkOwner doesn't exist - go to home
		if(reviewUser == null) {
			log.debug("User Not Found: username={}", username);
			return "redirect:/home";
		}

		ReviewDTO review = reviewService.getReview(reviewid);
		// If review doesn't exist - go to home
		if(review == null) {
			log.debug("Review Not Found: reviewid={}", reviewid);
			return "redirect:/home";
		}

		// If Logged in and Link belongs to a different user - go to home
		if(principal != null && !principal.getName().equals(reviewUser.getEmail()) ) {
			log.debug("AuthenticatedUser different than ReviewUser: principal={}, reviewUser={}", principal, reviewUser);
			return "redirect:/home";
		}

		if(review.getCompleteTime() != null) {
			log.debug("Review already completed: reviewid={}", reviewid);
			return "redirect:/home";
		}
		
		// set session authenticate as review link user
		if(principal == null) {
			userService.setAuthenticated(reviewUser);
		}

		return reviewRequest(reviewid, model, principal, reviewUser);
    }
    
    @RequestMapping(value= "/reviewRequest/{reviewId}")
    public String reviewRequest(@PathVariable("reviewId") String reviewId, Model model, Principal principal, UserDTO user) {
    	log.info("Review Request reviewId={}", reviewId);
    	ReviewDTO review = reviewService.getReview(reviewId);
    	user = (principal == null && user != null) ? user : userService.getUserByEmail(principal.getName())
				.orElse(null);

		if(review != null && review.getCompleteTime() == null)
			model.addAttribute("review", review);
        model.addAttribute("user", user);

        return "components/Reviews/reviewRequest";
    }

}
