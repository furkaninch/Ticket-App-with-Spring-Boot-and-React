package com.ticket.ticket.myticket;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ticket.ticket.user.User;
import com.ticket.ticket.user.UserService;


@Service
public class TicketService {
	@Autowired
	TicketRepository ticketRepository; 
	UserService userService;
	
	
	
	public TicketService(TicketRepository ticketRepository, UserService userService) {
		this.ticketRepository = ticketRepository;
		this.userService = userService; 
	}

	public void add(Ticket ticket,User user) {
		ticket.setUser(user);
		ticketRepository.save(ticket);
	}

	Page<Ticket> getTickets(Pageable page) {
		return ticketRepository.findAll(page); 
	}

	public Page<Ticket> getByUsername(String username, Pageable page) {
		User inDB = userService.getByUsername(username);
		return ticketRepository.findByUser(inDB, page);  
	}

	public void delete(long id) {
		ticketRepository.deleteById(id);
	}

	public void update(long id, @Valid Ticket ticket) {
		Ticket inDB = ticketRepository.findById(id);
		inDB.setCategory(ticket.getCategory());
		inDB.setDetails(ticket.getDetails());
		inDB.setPriority(ticket.getPriority());
		inDB.setStatus(ticket.getStatus());
		inDB.setSubject(ticket.getSubject());
		
		ticketRepository.save(inDB);
		
	}
}
