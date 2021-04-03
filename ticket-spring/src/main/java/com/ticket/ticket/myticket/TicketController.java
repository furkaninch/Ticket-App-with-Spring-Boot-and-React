package com.ticket.ticket.myticket;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticket.ticket.shared.CurrentUser;
import com.ticket.ticket.shared.GenericResponse;
import com.ticket.ticket.user.User;
import com.ticket.ticket.user.UserService;

@RestController
@RequestMapping("/api/1.0/tickets") 
public class TicketController {

	
	TicketService ticketService; 
	UserService userService;
	PasswordEncoder passwordEncoder;
	
	
	@Autowired
	public TicketController(TicketService ticketService, UserService userService,PasswordEncoder passwordEncoder) {
		this.ticketService = ticketService;
		this.userService = userService;
		this.passwordEncoder = passwordEncoder;
	}


	@PostMapping("/{username}/add")
	GenericResponse addTicket(@Valid @RequestBody Ticket ticket,@PathVariable String username,@CurrentUser User user) {
		User inDB = userService.getByUsername(username);
		ticketService.add(ticket,inDB);
		return new GenericResponse("ticket added successfully!"); 
	}
	
	
	@GetMapping("/get")
	Page <Ticket> getTickets(@PageableDefault(sort= "id" , direction= Direction.DESC) Pageable page) {
		return ticketService.getTickets(page);
	}

	 
	@GetMapping("/get/{username}")
	Page <Ticket> getTicketByUsername(@PathVariable String username,@PageableDefault(sort= "id" , direction= Direction.DESC)
	Pageable page){ 
		return ticketService.getByUsername(username, page);
	}
	
	@DeleteMapping("/delete/{id:[0-9]+}")
	GenericResponse deleteDirector(@PathVariable long id) {
		ticketService.delete(id);  
		return new GenericResponse("ticket deleted successfully");
	}
	@PutMapping("/update/{id:[0-9]+}")
	GenericResponse updateDirector(@PathVariable long id, @RequestBody @Valid Ticket ticket) {
		ticketService.update(id,ticket);
		return new GenericResponse("ticket updated successfully");
	}
	
}
 