import * as actionTypes from './actionsTypes';
import axios from 'axios';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (username, success, token = null) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        username: username,
        success: success,
        token: token
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(authLogout());
        }
            ,expirationTime);
    }
}

export const authSignIn = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: username,
            password: password
        }

        let url = 'http://127.0.0.1:5000/login';

        axios.post(url,authData)
        .then(response=>{
            console.log(response);

            dispatch(authSuccess(response.username,response.success,response.jwt));
        })
        .catch(error=> {
            
            
            dispatch(authFail(error));
        })
    }
}

export const authSignUp = (username, password,email) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: username,
            password: password,
            email: email
        }

        let url = '/signup';

        axios.post(url,authData)
        .then(response=>{
            console.log(response);

            dispatch(authSuccess(response.username,response.success));
        })
        .catch(error=> {
            dispatch(authFail(error));
        })
    }
}