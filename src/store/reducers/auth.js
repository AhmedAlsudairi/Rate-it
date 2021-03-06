import * as actionTypes from '../actions/actionsTypes';

const initalState = {
    token: null,
    username: null,
    success: false,
    error: null,
    loading: false
}

const authInit = (state,action) => {
    return {...state,...{loading: false, error: null, success: false}};
}

const authStart = (state,action) => {
    return {...state,...{loading: true, error: null, success: false}};
}

const authSuccess = (state,action) => {
    return {...state,...{token: action.token, username: action.username, error: null, loading: false, success: action.success}};
}

const authFail = (state,action) => {
    return {...state,...{error: action.error, loading: false, success: action.success}};
}

const authLogout = (state,action) => {
    return {...state,...{token: null, username: null, error: null, loading: false, success: false}};
}

const authReducer = (state = initalState, action) => {
   switch(action.type){
       case actionTypes.AUTH_START: return authStart(state,action);
       case actionTypes.AUTH_INIT: return authInit(state,action);
       case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
       case actionTypes.AUTH_FAIL: return authFail(state,action);
       case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
       default: return state;
   }
}

export default authReducer;