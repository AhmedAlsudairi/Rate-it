import * as actionTypes from './actionsTypes';
import axios from 'axios';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authInit = () => {
    return {
        type: actionTypes.AUTH_INIT
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
    localStorage.removeItem('token');
    localStorage.removeItem('success');
    localStorage.removeItem('username');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authInitite = () => {
    return dispatch => {
        dispatch(authInit());
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
            localStorage.setItem('token',response.data.jwt);
            localStorage.setItem('success',response.data.success);
            localStorage.setItem('username',response.data.username);
            dispatch(authSuccess(response.data.username,response.data.success,response.data.jwt));
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

        let url = 'http://127.0.0.1:5000/signup';

        axios.post(url,authData)
        .then(response=>{
            console.log(response);

            dispatch(authSuccess(response.data.username,response.data.success));
        })
        .catch(error=> {
            dispatch(authFail(error));
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(authLogout());
        }else{
            const success = localStorage.getItem('success');
            const username = localStorage.getItem('username');
            dispatch(authSuccess(username,success,token));
        }
    }
} 