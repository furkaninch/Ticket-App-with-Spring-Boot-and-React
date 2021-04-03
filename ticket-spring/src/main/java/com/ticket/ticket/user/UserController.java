package com.ticket.ticket.user;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticket.ticket.shared.CurrentUser;
import com.ticket.ticket.shared.GenericResponse;


@RestController
@RequestMapping("/api/1.0")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/auth")
	ResponseEntity<?> handleAuthentication(@CurrentUser User user) {
		UserVM userVM = new UserVM(user);
		return ResponseEntity.ok(userVM); 
	}

	@PostMapping("/register")
	GenericResponse registerUser(@RequestBody @Valid User user) {
		userService.save(user);
		return new GenericResponse("User registered successfully!");
	}
	
}
