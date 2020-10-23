import * as actionType from '../actions/actionsTypes';

const intialState = {
    loading: false,
    rating: [],
    error: null,
    loadingRatings: false
} 

const reducer = (state=intialState , action) => {
    switch(action.type){
        case actionType.RATE_INIT:
            return {
                ...state,
                error: null,
            }
        case actionType.RATE_START:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case actionType.RATE_SUCCESS:
            return {
                ...state,
                loading:false,
                rating: action.rateData,
                error: null,
            }

        case actionType.RATE_FAIL: 
        return {
            ...state,
            loading: false,
            error: action.error
        }

        case actionType.FETCH_RATINGS_START: 
        return {
            ...state,
            loadingRatings: true,
        }
        case actionType.FETCH_RATINGS_SUCCESS: 
        return {
            ...state,
            loadingRatings: false,
            rating: action.rating,
        }
        case actionType.FETCH_RATINGS_FAIL: 
        return {
            ...state,
            loadingRatings: false,
        }
        default: 
        return state;
    }
}

export default reducer;