import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createTicket, getCategories, getStatus} from '../Api-Calls/apiCalls';
import Button from '../components/Button';
import Input from '../components/Input';

const CreateTicket = () => {
    useEffect(() => {
        loadStatus();
        loadCategories(); 
    },[])

    const{username} = useSelector((store) => ({
        username: store.username
        }));
    

    const [form,setForm] = useState({
        category: "FRONTEND",
        status: "NEW",
        priority: "NORMAL",
        subject: null,
        details: null
    })
    const [successMessage,setSuccessMessage] = useState(false);
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
        setSuccessMessage(false);
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

    


    const onClickCreateTicket = async (event) => {
        event.preventDefault();
        try{
            await createTicket(form,username); 
            document.getElementById("form").reset();
            setForm({
                category: null,
                status: null,
                priority: null,
                subject: null,
                details: null
            });
            setSuccessMessage(true);
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
        <div className="container background p-3">
            <form id="form">
                <h1 className="text-center">Create Ticket</h1>
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
                <textarea name="details" className={detailsError ? 'form-control is-invalid rounded-0' : 'form-control rounded-0'} placeholder="Details..." rows="5" onChange={onChange}></textarea>
                <div className="invalid-feedback">
                        {detailsError}
                    </div>
                </div>
            
                {successMessage && <div class="alert alert-success text-center" role="alert">
                    Ticket Created Successfully!
                  </div>
                }
                <div className="text-center">
                    <Button onClick={onClickCreateTicket} text={'Create Ticket'} />
                </div>
            </form>
        </div>
    );
};

export default CreateTicket;