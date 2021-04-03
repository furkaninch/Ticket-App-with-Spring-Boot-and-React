package com.ticket.ticket.myticket;

import com.ticket.ticket.user.UserVM;

import lombok.Data;

@Data
public class TicketVM {
	
		private long id;
		
		private String category;
		
		private String status;
		
		private String priority;
		
		private String subject;
		
		private String details;
		
		
		private UserVM userVM;
	
	
	public TicketVM(Ticket ticket) {
		this.setId(ticket.getId());
		this.setStatus(ticket.getStatus());
		this.setCategory(ticket.getCategory());
		this.setPriority(ticket.getPriority());
		this.setSubject(ticket.getSubject());
		this.setDetails(ticket.getDetails());
		this.setUserVM(new UserVM (ticket.getUser()));
	}
}
