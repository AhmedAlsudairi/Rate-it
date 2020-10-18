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
        console.log(rateData);
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

export const fetchRatingsStart = () => {
    return {
        type: actionTypes.FETCH_RATINGS_START
    }
}

export const fetchRatingsSuccess = (rating) => {
    return {
        type: actionTypes.FETCH_RATINGS_SUCCESS,
        rating: rating
    }
}

export const fetchRatingsFail = (error) => {
    return{
        type: actionTypes.FETCH_RATINGS_FAIL,
        error: error
    }
}

export const fetchRatings = (course) => {
    
    return dispatch => {
        dispatch(fetchRatingsStart());
        console.log(course);
        axios.get('http://127.0.0.1:5000/ratings')
        .then(res => {
            let fechedRatings = [];
            fechedRatings=[...res.data.favourite_courses];
            console.log(res.data.favourite_courses);
            dispatch(fetchRatingsSuccess(fechedRatings));
            
        })
        .catch(err=>{
            console.log(err);
            dispatch(fetchRatingsFail(err));
        });
    }
}