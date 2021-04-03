import React from 'react';
import TicketFeed from '../components/TicketFeed';

const HomePage = () => {
    return (
        <div className="background">
        <div className="container">
            <div className="mb-3">
                <h1 className="text-center">All Tickets</h1>
            </div> 
            <TicketFeed />
        </div>
        </div>
    );
};

export default HomePage;