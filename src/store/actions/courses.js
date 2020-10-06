import * as actionTypes from './actionsTypes';
import axios from 'axios';

//

export const fetchCoursesStart = () => {
    return {
        type: actionTypes.FETCH_COURSES_START
    }
}

export const fetchCoursesSuccess = (courses) => {
    return {
        type: actionTypes.FETCH_COURSES_SUCCESS,
        courses: courses
    }
}

export const fetchCoursesFail = (error) => {
    return{
        type: actionTypes.FETCH_COURSES_FAIL,
        error: error
    }
}

export const fetchCourses = (level) => {
    return dispatch => {
        dispatch(fetchCoursesStart());
       
    console.log(level);
        axios.get('http://127.0.0.1:5000/courses?level='+level)
        .then(res => {
            let fechedCourses = [];
            fechedCourses=[...res.data.courses];
            dispatch(fetchCoursesSuccess(fechedCourses));
            
        })
        .catch(err=>{
            // dispatch(fetchCoursesFail(err));
        });
    }
}