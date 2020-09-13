import * as actionTypes from '../actions/actionsTypes';

const initalState = {
    tokenId: null,
    userId: null,
    error: null,
    loading: false
}

const authStart = (state,action) => {
    return {...state,...{loading: true}};
}

const authSuccess = (state,action) => {
    return {...state,...{tokenId: action.tokenId, userId: action.userId, error: null, loading: false}};
}

const authFail = (state,action) => {
    return {...state,...{error: action.error, loading: false}};
}


const authReducer = (state = initalState, action) => {
   switch(action.type){
       case actionTypes.AUTH_START: return authStart(state,action);
       case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
       case actionTypes.AUTH_FAIL: return authFail(state,action);
       default: return state;
   }
}

export default authReducer;