import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteTicket } from '../Api-Calls/apiCalls';
import { updateId } from '../redux/authActions';

const MyTicketView = (props) => {
    const loggedInUser =  useSelector(store => store.username); 
    
    const {ticket} = props;

    const {category,priority,subject,status,details,id,user} = ticket;

    const {username,name} = user; 


    const {push} = useHistory();

    const dispatch = useDispatch();

    const{isLoggedIn} = useSelector((store) => ({
        isLoggedIn: store.isLoggedIn,
    }))

   

    const ownedByLoggedInUser = loggedInUser === username;
    
    const onClickDelete = async event => {
        event.preventDefault();
        await deleteTicket(id)
        push("/");
        push("/mytickets");
    }

    const onClickUpdate = async() => {
        await dispatch(updateId(id,name,username)); 
        push("/updateticket");
    }

    return (
        
        <tr>
            <td>{category}</td>
            <td>{priority}</td>
            <td>{subject}</td>
            <td>{status}</td>
            <td>{details}</td>
            { ownedByLoggedInUser && isLoggedIn && <td>
            <button onClick={onClickDelete}
                  className="btn btn-delete-link btn-sm ml-4">
                    <span className="material-icons">
                        delete_outline
                    </span>
                </button>
            <button className="btn btn-sm btn-edit float-end" onClick={onClickUpdate}>
                <span className="material-icons">
                    create_outline
                </span>
            </button>
            </td> 
     }
        </tr>
           
     
    );
};

export default MyTicketView;