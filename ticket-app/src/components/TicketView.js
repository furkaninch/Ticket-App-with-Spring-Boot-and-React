import React from 'react';


const TicketView = (props) => {

    const {ticket} = props;

    const {category,priority,subject,status,details} = ticket;

    return (
        <tr>
            <td>{category}</td>
            <td>{priority}</td>
            <td>{subject}</td>
            <td>{status}</td>
            <td>{details}</td>
        </tr>
    );
};

export default TicketView;