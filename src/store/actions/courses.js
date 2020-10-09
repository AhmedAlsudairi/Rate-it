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

export const selectCourse = (course) => {
    return{
        type: actionTypes.SELECT_COURSE,
        course: course
    }
}

export const fetchCourses = (level,keyword) => {
    return dispatch => {
        dispatch(fetchCoursesStart());
        let path = '';
        if(level!==null){
            path = 'level='+level;
        }
        if(keyword!==null && keyword!==''){
            path = 'courseName='+keyword+'&'+'courseId='+keyword;
        }

        axios.get('http://127.0.0.1:5000/courses?'+path)
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