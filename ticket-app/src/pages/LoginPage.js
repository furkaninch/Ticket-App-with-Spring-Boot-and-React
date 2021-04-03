import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import Input from '../components/Input';
import { loginHandler } from '../redux/authActions';

const LoginPage = (props) => {

    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [error , setError] = useState(null);
    const dispatch = useDispatch();


    const onChangeUsername= (event) => {
        setUsername(event.target.value)
    }
    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }
    
    useEffect(() => {
        setError(null);
    },[username,password])

    const onClickLogin = async event => {
        event.preventDefault();
        const {push} = props.history;
        const creds = {
            username,
            password
        }

        setError(undefined);
        try{
            await dispatch(loginHandler(creds));
            push('/');
        }
        catch(apiError){
             setError(apiError.response.data.message);
        }
       
    }


    
    return (
        <div className="container background p-3">
            <form>
                <h1 className="text-center">Login</h1>
                <Input label = 'Username' onChange={onChangeUsername}/>
                <Input label= 'Password' onChange={onChangePassword} type="password"/>
                {error && <div className="alert alert-danger">
                    {error}
                </div>}
                <div className="text-center">
                    <Button  onClick={onClickLogin}  text='Login'/>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;