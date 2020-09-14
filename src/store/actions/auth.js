import * as actionTypes from './actionsTypes';
import axios from 'axios';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (tokenId, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenId: tokenId,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authSignIn = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: username,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBU3mjOGnJu8ImOmlcQ9FPpdvCFjxJwggo';

        axios.post(url,authData)
        .then(response=>{
            console.log(response);

            dispatch(authSuccess(response.data.idToken,response.data.localId));
        })
        .catch(error=> {
            
            
            dispatch(authFail(error.response.data.error.message));
        })
    }
}

export const authSignUp = (username, password,email) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: username,
            password: password,
            email: email,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBU3mjOGnJu8ImOmlcQ9FPpdvCFjxJwggo';

        axios.post(url,authData)
        .then(response=>{
            console.log(response);

            dispatch(authSuccess(response.data.idToken,response.data.localId));
        })
        .catch(error=> {
            
            
            dispatch(authFail(error.response.data.error.message));
        })
    }
}