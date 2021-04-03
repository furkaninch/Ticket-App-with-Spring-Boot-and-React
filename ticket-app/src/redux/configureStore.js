import {applyMiddleware, createStore , compose} from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import thunk from 'redux-thunk';
import {setAuthorizationHeader} from '../Api-Calls/apiCalls';

    const configureStore = ()=>{
        const hoaxAuth = localStorage.getItem('hoax-auth');

    
        let stateInLocalStorage = {
            isLoggedIn: false,
            name: undefined, 
            username: undefined,
            password: undefined,
            id: undefined
        };
        
        if(hoaxAuth){
            // return hoaxAuth;
            try{
                stateInLocalStorage = JSON.parse(hoaxAuth)
            }catch(error){
    
            }
        }

        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        const store = createStore(authReducer,stateInLocalStorage,composeEnhancers(applyMiddleware(thunk)))
       
        store.subscribe(() => {
            localStorage.setItem('hoax-auth',JSON.stringify(store.getState()));
        });
    
        return store;
    }

export default configureStore;