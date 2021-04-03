const defaultState = {
    name: undefined,
    username: undefined,
    isLoggedIn: false,
    password: undefined,
    id: undefined 
  }


const authReducer = (state = {...defaultState},action) => {
    if(action.type === 'logout-success'){
        return defaultState
    }else if(action.type === 'login-success'){
        return {
            ...action.payload,
            isLoggedIn:true
        }
    }else if(action.type === 'update-id'){
        return {
            ...action.payload,
            isLoggedIn:true,
        }
    }
    return state;
}

export default authReducer;