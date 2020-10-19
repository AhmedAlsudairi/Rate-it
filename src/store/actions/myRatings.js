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
        console.log(course);
        axios.get('http://127.0.0.1:5000/ratings')
        .then(res => {
            let fechedRatings = [];
            fechedRatings=[...res.data.favourite_courses];
            console.log(res.data.favourite_courses);
            dispatch(fetchMyRatingsSuccess(fechedRatings));
            
        })
        .catch(err=>{
            console.log(err);
            dispatch(fetchMyRatingsFail(err));
        });
    }
}

export const removeRating = (course,token) => {
    return dispatch => {

        axios.delete('http://127.0.0.1:5000/favourite?course='+course.course_id,{
            headers: {
              authorization: `Bearer ${token}`
            }
          })
        .then(res => {
            let fechedFavorite = [];
            fechedFavorite=[...res.data.favourite_courses];
            console.log(res.data.favourite_courses);
            dispatch(fetchMyRatingsSuccess(fechedFavorite));
            
        })
        .catch(err=>{
            dispatch(fetchMyRatingsFail(err));
        });
    }
}