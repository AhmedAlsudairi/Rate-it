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

        axios.post('https://rateitbackend.herokuapp.com/ratings',rateData)
        .then(resonse=>{
            let ratings = resonse.data.ratings
            console.log(resonse.data.ratings);
            
           dispatch(rateSuccess(ratings));
           
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

export const selectCourse = (course) => {
    localStorage.setItem('course', JSON.stringify(course));
    return{
        type: actionTypes.SELECT_COURSE,
        course: course
    }
}

export const fetchRatings = (course) => {
    
    return dispatch => {
        dispatch(fetchRatingsStart());
        axios.get('https://rateitbackend.herokuapp.com/ratings?course_id='+course)
        .then(res => {
            let fechedRatings = [];
            fechedRatings=[...res.data.ratings.ratings];
            console.log(res.data);
            dispatch(fetchRatingsSuccess(fechedRatings));
            dispatch(selectCourse(res.data.ratings))
        })
        .catch(err=>{
            console.log(err);
            dispatch(fetchRatingsFail(err));
        });
    }
}

export const likeOrDislikeRating = (username, course, liked_by="", disliked_by="") => {
    
    return dispatch => {
        dispatch(fetchRatingsStart());
        let ratingData = { 
            username: username,  
            course_id: course, 
            liked_by: liked_by, 
            disliked_by: disliked_by }

        axios.patch('https://rateitbackend.herokuapp.com/ratings',ratingData)
        .then(res => {
            console.log(res.data.ratings);
            let fechedRatings = [];
            fechedRatings=[...res.data.ratings];
            dispatch(fetchRatingsSuccess(fechedRatings));
            
        })
        .catch(err=>{
            console.log(err);
            dispatch(fetchRatingsFail(err));
        });
    }
}