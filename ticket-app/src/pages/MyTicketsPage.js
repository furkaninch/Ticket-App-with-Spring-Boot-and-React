import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react/cjs/react.development';
import { getMyTickets } from '../Api-Calls/apiCalls';
import MyTicketView from '../components/MyTicketView';

const MyTicketsPage = () => {
    const [myTicketPage , setMyTicketPage] = useState({content:[] , last : true , number: 0});
    
    const loggedInUser =  useSelector(store => store.username);

    const loadTickets = async (page) => {
        try{
        const response = await getMyTickets(page , loggedInUser);
        setMyTicketPage(response.data);
        }catch(error){
        }
    }

    const onClickNext = () => {
        const nextPage = myTicketPage.number + 1;
        loadTickets(nextPage,loggedInUser);
    }
    const onClickPrevious = () => {
        const previousPage= myTicketPage.number - 1;
        loadTickets(previousPage,loggedInUser);
    }    
    useEffect(() => {
        loadTickets(loggedInUser);
    },[])
    
    const {content,last,first} = myTicketPage; 
    let actionDiv = (
        <div>
            {last === false && <button onClick={onClickNext} className="btn btn-sm btn-primary float-right">
                Next</button>}
            {first === false && <button onClick={onClickPrevious} className= "btn btn-sm btn-primary">Previous</button>
            }
        </div>
    );

    return (
        <div className="background">
        <div className="container"> 
        <div className="mb-3">
                <h1 className="text-center">My Tickets</h1>
            </div> 
            <div className="container  col-12">  
           <table className="table table-sm form-background table-bordered table-striped">
            <thead>
                <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Status</th>
                    <th scope="col">Details</th>
                    <th scope="col-sm">Edit</th>
                </tr>
            </thead> 
            <tbody>
            {content.map(ticket => {
                return <MyTicketView key={ticket.id} ticket={ticket}/> 
            })}
            </tbody>
        </table>
        {actionDiv}
        </div>
        </div>
        </div>
    );
   
};

export default MyTicketsPage;