package com.ticket.ticket.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ticket.ticket.error.NotFoundException;



@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	PasswordEncoder passwordEncoder;
	
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}
	
	public void save(User user) {
		String encryptedPassword = this.passwordEncoder.encode(user.getPassword());
		user.setPassword(encryptedPassword);
		userRepository.save(user); 	
	}
	
	public User getByUsername(String username) {
		User inDB =  userRepository.findByUsername(username);
		if(inDB == null) {
			throw new NotFoundException(); 
		}
		return inDB;
	}

	

}
