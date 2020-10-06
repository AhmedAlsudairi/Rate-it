import * as actionTypes from '../actions/actionsTypes';

const initalState = {
    courses: [],
    loading: false,
    error: null
}

const coursesStart = (state,action) => {
    return {...state,...{loading: true, error: null}};
}

const coursesSuccess = (state,action) => {
    return {...state,...{loading: false, error: null,  courses: action.courses}};
}

const coursesFail = (state,action) => {
    return {...state,...{error: action.error, loading: false}};
}

const coursesReducer = (state = initalState, action) => {
   switch(action.type){
       case actionTypes.FETCH_COURSES_START: return coursesStart(state,action);
       case actionTypes.FETCH_COURSES_SUCCESS: return coursesSuccess(state,action);
       case actionTypes.FETCH_COURSES_FAIL: return coursesFail(state,action);
       default: return state;
   }
}

export default coursesReducer;