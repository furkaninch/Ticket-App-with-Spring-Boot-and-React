import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import {useDispatch} from 'react-redux';
import {signUpHandler} from '../redux/authActions';
import { register } from '../Api-Calls/apiCalls';

const RegisterPage = (props) => {
 
    const dispatch = useDispatch();
    const [form,setForm] = useState({
        username: null,
        name: null,
        lastName: null,
        password: null,
        email: null
    })
    const [errors,setErrors] = useState({});
    
    const onChange = event =>{
        const{name,value} = event.target;
        
        setForm((previousForm) => ({
            ...previousForm,
            [name]: value
        }));
        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: undefined
        }));
    }

   const  onClickSignup = async event => {
        event.preventDefault();
        const { push } = props.history;

        try{
           await dispatch(signUpHandler(form));
           
           push('/');
        }catch(error){
                if(error.response.data.validationErrors){
                    setErrors(error.response.data.validationErrors);
            }
        }
       
    }
   

    const {username: usernameError,name: nameError,password:passwordError, lastName: lastNameError,
    email:emailError} = errors;
    
    return(
    <div className="container background">
        <form>
            <h1 className="text-center">Sign Up</h1>

            <Input name="email" label='E-Mail' error={emailError} onChange={onChange}/>

            <Input name="username" label='Username' error={usernameError} onChange={onChange}/>
            
            <Input name="name" label='Name' error={nameError} onChange={onChange}/>

            <Input name="lastName" label='Last Name' error={lastNameError} onChange={onChange}/>

            <Input name="password" label='Password' error={passwordError} onChange ={onChange} type="password"/>
            
            
            
            <div className="text-center">
                <Button  onClick={onClickSignup}   text='Sign Up'/>
            </div>
            </form> 
        </div>
    );
}

export default RegisterPage;