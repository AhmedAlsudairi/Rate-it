import * as actionType from '../actions/actionsTypes';

const intialState = {
    loading: false,
    rating: []
} 

const reducer = (state=intialState , action) => {
    switch(action.type){
        
        case actionType.FETCH_MY_RATINGS_START: 
        return {
            ...state,
            loadingRatings: true
        }
        case actionType.FETCH_MY_RATINGS_SUCCESS: 
        return {
            ...state,
            loadingRatings: false,
            rating: action.rating
        }
        case actionType.FETCH_MY_RATINGS_FAIL: 
        return {
            ...state,
            loadingRatings: false
        }
        default: 
        return state;
    }
}

export default reducer;