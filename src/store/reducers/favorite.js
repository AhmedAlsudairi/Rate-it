import * as actionTypes from '../actions/actionsTypes';

const initalState = {
    favorite: ["ENGS 100"],
    loading: false,
    error: null
}

const favoriteStart = (state,action) => {
    return {...state,...{loading: true, error: null}};
}

const favoriteSuccess = (state,action) => {
    return {...state,...{loading: false, error: null,  favorite: action.favorite}};
}

const favoriteFail = (state,action) => {
    return {...state,...{error: action.error, loading: false}};
}


const favoriteReducer = (state = initalState, action) => {
   switch(action.type){
       case actionTypes.FETCH_FAVORITE_START: return favoriteStart(state,action);
       case actionTypes.FETCH_FAVORITE_SUCCESS: return favoriteSuccess(state,action);
       case actionTypes.FETCH_FAVORITE_FAIL: return favoriteFail(state,action);
       default: return state;
   }
}

export default favoriteReducer;