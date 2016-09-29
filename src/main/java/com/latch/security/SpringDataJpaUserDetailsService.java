package com.latch.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.latch.domain.UserDTO;
import com.latch.service.UserService;

@Component
public class SpringDataJpaUserDetailsService implements UserDetailsService {

	private final UserService userService;
	
	@Autowired
	public SpringDataJpaUserDetailsService(UserService userService) {
		this.userService = userService;
	}
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
				
		UserDTO user = userService.getUserByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException(String.format("User with email=%s was not found", email)));
		
		String username = user.getEmail();
		String password = user.getPassword();
		boolean enabled = user.getAuthenticated();
		boolean accountNonExpired = true;
		boolean credentialsNonExpired = true;
		boolean accountNonLocked = true;
		
		return new User(username, password, 
				enabled, accountNonExpired, credentialsNonExpired, accountNonLocked,
				AuthorityUtils.createAuthorityList(user.getRoles()));
	}

}
