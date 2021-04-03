import axios from 'axios';
import { useSelector } from 'react-redux';

export const register = (user) => {
    // delete axios.defaults.headers['Authorization'];
    return axios.post("/api/1.0/register",user);
}

export const login = (creds) => { 
    return axios.post("/api/1.0/auth",{},{auth: creds});
}

export const setAuthorizationHeader = ({username,password,isLoggedIn}) => {
    if(isLoggedIn){
        const authorizationHeaderValue = `Basic ${btoa(username + ':' + password)}`;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    }
    else{
        delete axios.defaults.headers['Authorization'];
    } 
}



export const getCategories=()=>{
    return axios.get("https://604938a3fb5dcc0017969c2d.mockapi.io/api/category");
}
  
export const getStatus=()=>{
    return axios.get("https://604938a3fb5dcc0017969c2d.mockapi.io/api/status");
}


export const createTicket = (ticket,username) => {
    return axios.post(`/api/1.0/tickets/${username}/add`,ticket);
} 

export const getTickets = (page = 0) => {
    // delete axios.defaults.headers['Authorization'];
    return axios.get(`/api/1.0/tickets/get?page=${page}`);
}


export const getMyTickets = (page = 0 , username) => { 
    // delete axios.defaults.headers['Authorization'];
    return axios.get(`/api/1.0/tickets/get/${username}?page=${page}`);
}
export const deleteTicket = id => {
    return axios.delete(`/api/1.0/tickets/delete/${id}`); 
}

export const updateTicket = (body,id) => {
    return axios.put(`/api/1.0/tickets/update/${id}`,body);
}