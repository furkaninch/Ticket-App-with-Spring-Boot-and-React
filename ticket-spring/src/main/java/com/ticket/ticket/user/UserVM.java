package com.ticket.ticket.user;


import lombok.Data;

@Data
public class UserVM {
	
	private long id;
	
	private String name;
	
	private String lastName;
	
	private String username;
	
	private String password;
	
	public UserVM(User user) {
		this.setUsername(user.getUsername());
		this.setName(user.getName());;
		this.setLastName(user.getLastName());
		this.setId(user.getId());
		this.setPassword(user.getPassword());
	}
}
