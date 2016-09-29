package com.latch.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import com.latch.service.UserService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private SpringDataJpaUserDetailsService userDetailsService;
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
				.userDetailsService(this.userDetailsService)
						.passwordEncoder(UserService.PASSWORD_ENCODER);
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
			.antMatchers("/*.js", 
						"/*.css",
						"/*.jsx",
						"/*.html",
						"/",
						"/register",
						"/registerUser",
						"/registerSuccess",
						"/authenticate",
						"/authenticate/**",
						"/authenticateFailure",
						"/login",
						"/forgot",
						"/forgotSuccess",
						"/passwordHelp",
						"/forgotPassword",
						"/forgotPassword/**",
						"/verifyHelp",
						"/verifyHelpEmailSend",
						"/verifyHelpSuccess",
						"/checkUserExists",
						"/changePassword",
						"/reset",
						"/resetSuccess",
						"/about",
						"/index",
						"/privacy",
						"/contact",
						"/404",
						"/500",
						"/401",
						"/public/*",
						"/getMarker",
						"/api/users/*",
						"/findUserById",
						"/getReviewsForUser",
						"/api/remoteFiles/view/*",
						"/getFacebookSettings",
						"/getZillowSettings",
						"/getZillowReviews",
						"/getLinkedInProfile",
						"/getGooglePlusProfile",
						"/getInstagramProfile",
						"/secureAccess/*",
						"/index.html").permitAll().anyRequest().authenticated()
			.and().formLogin().loginPage("/login").defaultSuccessUrl("/home", false).permitAll()
			.and().httpBasic()
			.and().rememberMe()
			// force any requests on HTTP to redirect to HTTPS  
			.and().requiresChannel().anyRequest().requiresSecure()
			.and().csrf().disable()
			.logout().deleteCookies("remember-me").logoutSuccessUrl("/login");
	}
}
