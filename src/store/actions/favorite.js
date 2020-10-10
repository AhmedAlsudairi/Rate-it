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

export const fetchFavorite = () => {
    return dispatch => {
        dispatch(fetchFavoriteStart());

        axios.get('http://127.0.0.1:5000/favorite?'+path)
        .then(res => {
            let fechedFavorite = [];
            fechedFavorite=[...res.data.favorite];
            dispatch(fetchFavoriteSuccess(fechedFavorite));
            
        })
        .catch(err=>{
            dispatch(fetchFavoriteFail(err));
        });
    }
}