package com.ticket.ticket.myticket;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ticket.ticket.user.User;


public interface TicketRepository extends JpaRepository<Ticket,Long> {
	
	Page <Ticket> findByUser (User user , Pageable page);
	Ticket findById(long id);
}
