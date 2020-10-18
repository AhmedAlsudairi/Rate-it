import * as actionType from '../actions/actionsTypes';

const intialState = {
    loading: false
} 

const reducer = (state=intialState , action) => {
    switch(action.type){
        case actionType.RATE_INIT:
            return {
                ...state
            }
        case actionType.RATE_START:
            return {
                ...state,
                loading: true
            }
        case actionType.RATE_SUCCESS:
            const newRate= {
                ...action.rateData
            }
            return {
                ...state,
                loading:false
            }

        case actionType.RATE_FAIL: 
        return {
            ...state,
            loading: false
        }
        default: 
        return state;
    }
}

export default reducer;