package com.ticket.ticket;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.ticket.ticket.myticket.Ticket;
import com.ticket.ticket.myticket.TicketService;
import com.ticket.ticket.user.User;
import com.ticket.ticket.user.UserService;



@SpringBootApplication
public class TicketApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketApplication.class, args);
	}
	
	@Bean
	CommandLineRunner createInitialUsers(UserService userService, TicketService ticketService) {
		return (args) -> {
			
			for (int i  = 1 ; i <=25 ; i++) {
				User user = new User(); 
				user.setEmail("example"+i+"@gmail.com");
				user.setName("user name"+ i);
				user.setLastName("user last name" + i);
				user.setPassword("P4ssword");
				user.setUsername("user"+i);
				userService.save(user);
				
			for (int j = 1 ; j<=2 ; j++ ) {
				Ticket ticket = new Ticket();
				ticket.setCategory("category");
				ticket.setDetails("details" + j);
				ticket.setPriority("Urgent");
				ticket.setSubject("subject" + j);
				ticket.setStatus("status");
				ticketService.add(ticket,user);
			}
			}
			};
			
	}

}
