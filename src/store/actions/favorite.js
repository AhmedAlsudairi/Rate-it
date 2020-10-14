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
        
        console.log(token);
        axios.get('http://127.0.0.1:5000/favourite',{
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
            console.log(err);
            dispatch(fetchFavoriteFail(err));
        });
    }
}

export const addFavorite = (course,token) => {
    return dispatch => {
        
        axios.post('http://127.0.0.1:5000/favourite?course='+course.course_id,null,{
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

        axios.delete('http://127.0.0.1:5000/favourite?course='+course.course_id,{
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