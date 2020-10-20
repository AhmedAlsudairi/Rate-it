import * as actionTypes from '../actions/actionsTypes';

const initalState = {
    favorite: [],
    favoriteIDs: [],
    loading: false,
    error: null
}

const favoriteStart = (state,action) => {
    return {...state,...{loading: true, error: null}};
}

const favoriteSuccess = (state,action) => {
    let IDs = action.favorite.map((item)=> item.course.course_id);
    return {...state,...{loading: false, error: null,  favorite: action.favorite, favoriteIDs: IDs}};
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