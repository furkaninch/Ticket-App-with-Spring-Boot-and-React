package com.ticket.ticket.myticket;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.ticket.ticket.user.User;

import lombok.Data;

@Data
@Entity
public class Ticket {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull
	private String category;
	
	@NotNull
	private String status;
	
	@NotNull
	private String priority;
	
	@NotNull
	private String subject;
	 
	@NotNull
	@Size(min=1 , max= 255)
	@Column(length = 1000)
	private String details;
	
	@ManyToOne
	private User user;
} 
