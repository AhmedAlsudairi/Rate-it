import * as actionTypes from './actionsTypes';
import axios from 'axios';



export const fetchMyRatingsStart = () => {
    return {
        type: actionTypes.FETCH_MY_RATINGS_START
    }
}

export const fetchMyRatingsSuccess = (rating) => {
    return {
        type: actionTypes.FETCH_MY_RATINGS_SUCCESS,
        rating: rating
    }
}

export const fetchMyRatingsFail = (error) => {
    return{
        type: actionTypes.FETCH_MY_RATINGS_FAIL,
        error: error
    }
}

export const fetchMyRatings = (username) => {
    
    return dispatch => {
        dispatch(fetchMyRatingsStart());
        axios.get('http://127.0.0.1:5000/myRatings?username='+username)
        .then(res => {
            let fechedRatings = [];
            fechedRatings=[...res.data.ratings];
            console.log(res.data.ratings);
            dispatch(fetchMyRatingsSuccess(fechedRatings));
            
        })
        .catch(err=>{
            console.log(err);
            dispatch(fetchMyRatingsFail(err));
        });
    }
}

export const removeRating = (username, course) => {
    return dispatch => {

        axios.delete(`http://127.0.0.1:5000/myRatings?username=${username}&course_id=${course}`)
        .then(res => {
            let fechedRatings = [];
            fechedRatings=[...res.data.ratings];
            console.log(res.data);
            dispatch(fetchMyRatingsSuccess(fechedRatings));
            
        })
        .catch(err=>{
            dispatch(fetchMyRatingsFail(err));
        });
    }
}