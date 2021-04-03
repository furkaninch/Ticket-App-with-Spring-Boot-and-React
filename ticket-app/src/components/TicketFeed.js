import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import { getTickets } from '../Api-Calls/apiCalls';
import TicketView from './TicketView'

const TicketFeed = () => {
    const [ticketPage , setTicketPage] = useState({content:[] , last : true , number: 0});
    
    const loadTickets = async (page) => {
        try{
        const response = await getTickets(page);
        setTicketPage(response.data);
        }catch(error){
        }
    }

    const onClickNext = () => {
        const nextPage = ticketPage.number + 1;
        loadTickets(nextPage);
    }
    const onClickPrevious = () => {
        const previousPage= ticketPage.number - 1;
        loadTickets(previousPage);
    }    
    useEffect(() => {
        loadTickets();
    },[]) 
    
    const {content,last,first} = ticketPage; 
    let actionDiv = (
        <div>
            {last === false && <button onClick={onClickNext} className="btn btn-sm btn-primary float-right">
                Next</button>}
            {first === false && <button onClick={onClickPrevious} className= "btn btn-sm btn-primary">Previous</button>
            }
        </div>
    );

    return (
        <div >
        <div className="container  col-12">  
           <table className="table form-background table-bordered table-striped">
            <thead>
                <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Status</th>
                    <th scope="col">Details</th>
                </tr>
            </thead> 
            <tbody>
            {content.map(ticket => {
                return <TicketView key={ticket.id} ticket={ticket}/>
            })}
            </tbody>
        </table>
        {actionDiv}
        </div>
        </div>
    );
   
};

export default TicketFeed;