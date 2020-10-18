import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const rateSuccess = (rateData) => {
    return {
        type: actionTypes.RATE_SUCCESS,
        rateData: rateData
    }
}

export const rateFail = (error) => {
    return {
        type: actionTypes.RATE_FAIL,
        error: error
    }
}

export const rateStart = () => {
    return {
        type: actionTypes.RATE_START
    }
}
export const rateProcess = (rateData) => {
    return dispatch => {
        dispatch(rateStart());
        
        axios.post('/rates.json',rateData)
        .then(resonse=>{
            console.log(resonse.data);
            
           dispatch(rateSuccess(resonse.data.name,rateData));
           
        })
        .catch(error=>{
         
            dispatch(rateFail(error));
            
        });
    }
}

export const rateInit = () => {
    return {
        type: actionTypes.RATE_INIT
    }
}