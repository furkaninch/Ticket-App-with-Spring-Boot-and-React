import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {  getCategories, getStatus ,updateTicket} from '../Api-Calls/apiCalls';
import Button from '../components/Button';
import Input from '../components/Input';

const TicketUpdatePage = () => {
    useEffect(() => {
        loadStatus();
        loadCategories(); 
    },[])

    
    
    const [form,setForm] = useState({
        category: "FRONTEND",
        status: "NEW",
        priority: "NORMAL",
        subject: null,
        details: null
    })

    const [errors,setErrors] = useState({});
    const [status,setStatus] = useState([]);
    const [categories,setCategories] = useState([]);

    const onChange = event => {
        const {name,value} = event.target;
        setForm((previousForm) => ({
            ...previousForm,
            [name]: value
        }));
        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: undefined
        }));
        
    }

    const loadStatus = async () => {
        try{
            const response = await getStatus();
            setStatus(response.data);
        }catch(error){
            console.log("error");
        }
    }
    const loadCategories = async () => {
        try{
            const response = await getCategories();
            setCategories(response.data);
        }catch(error){
            console.log("error");
        }
    }
    
    const{id} = useSelector((store) => ({
        id: store.id
    }))

    const {push} = useHistory();

    const onClickUpdateTicket = async (event) => {
        event.preventDefault();
        try{
            await updateTicket(form,id);  
            setForm({
                category: null,
                status: null,
                priority: null,
                subject: null,
                details: null
            });
            push('/mytickets');
        }
        catch(error){
            if(error.response.data.validationErrors){
                setErrors(error.response.data.validationErrors);
            }
        }
    }

    
    const {category: categoryError, status: statusError, priority: priorityError, 
     subject: subjectError, details: detailsError} = errors;
    return (
        <div className="container p-3">
            <form id="form">
                <h1 className="text-center">Update Ticket</h1>
                <label>Status</label>
                <select name = "status" className=" form-control form-select form-select-lg mb-3" onChange={onChange}>
                    {status.map(status => {
                    return <option>{status.statusCode}</option>
                    })}
                </select>
                <label>Category</label>
                <select name = "category" className=" form-control form-select form-select-lg mb-3" onChange={onChange}>
                    {categories.map(category => {
                    return <option>{category.category}</option>
                    })}
                </select>
                <label>Priority</label>
                <select name = "priority" className=" form-control form-select form-select-lg mb-3" onChange={onChange}>
                        <option selected>Normal</option>
                        <option>Urgent</option>
                </select>
                <Input error={subjectError}  name="subject"  label = 'Subject' onChange={onChange}/>
                <div className="form-group">
                <label>Details</label>
                <textarea name="details" className="form-control rounded-0" placeholder="Details..." rows="5" onChange={onChange}></textarea>
                </div>
            
                <div className="text-center">
                    <Button onClick={onClickUpdateTicket} text={'Update Ticket'} />
                </div>
            </form>
        </div>
    );
};

export default TicketUpdatePage;