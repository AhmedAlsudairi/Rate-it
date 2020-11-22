import * as actionTypes from './actionsTypes';
import axios from 'axios';

//

export const fetchFavoriteStart = () => {
    return {
        type: actionTypes.FETCH_FAVORITE_START
    }
}

export const fetchFavoriteSuccess = (favorite) => {
    return {
        type: actionTypes.FETCH_FAVORITE_SUCCESS,
        favorite: favorite
    }
}

export const fetchFavoriteFail = (error) => {
    return{
        type: actionTypes.FETCH_FAVORITE_FAIL,
        error: error
    }
}

export const fetchFavorite = (token) => {
    
    return dispatch => {
        dispatch(fetchFavoriteStart());
    
        axios.get('https://rateitbackend.herokuapp.com/favourite',{
            headers: {
              authorization: `Bearer ${token}`
            }
          })
        .then(res => {
            let fechedFavorite = [];
            fechedFavorite=[...res.data.favourite_courses];
            dispatch(fetchFavoriteSuccess(fechedFavorite));
            
        })
        .catch(err=>{
            console.log(err);
            dispatch(fetchFavoriteFail(err));
        });
    }
}

export const addFavorite = (course,token) => {
    return dispatch => {
        
        axios.post('https://rateitbackend.herokuapp.com/favourite?course='+course.course_id,null,{
            headers: {
              authorization: `Bearer ${token}`
            }
          })
        .then(res => {
            let fechedFavorite = [];
            fechedFavorite=[...res.data.favourite_courses];
            console.log(res.data.favourite_courses);
            dispatch(fetchFavoriteSuccess(fechedFavorite));
            
        })
        .catch(err=>{
            dispatch(fetchFavoriteFail(err));
        });
    }
}

export const removeFavorite = (course,token) => {
    return dispatch => {

        axios.delete('https://rateitbackend.herokuapp.com/favourite?course='+course.course_id,{
            headers: {
              authorization: `Bearer ${token}`
            }
          })
        .then(res => {
            let fechedFavorite = [];
            fechedFavorite=[...res.data.favourite_courses];
            console.log(res.data.favourite_courses);
            dispatch(fetchFavoriteSuccess(fechedFavorite));
            
        })
        .catch(err=>{
            dispatch(fetchFavoriteFail(err));
        });
    }
}