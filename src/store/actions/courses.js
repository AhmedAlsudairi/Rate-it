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

export const fetchCourses = () => {
    return dispatch => {
        dispatch(fetchCoursesStart());

        axios.get('http://127.0.0.1:5000/courses')
        .then(res => {
            const fechedCourses = [];
            console.log(res);
            // for(let key in res.data){
            //     fechedOrders.push(
            //         {...res.data[key],
            //             id: key} );
                        
            // }
            
            // dispatch(fetchOrdersSuccess(fechedOrders));
            
        })
        .catch(err=>{
            dispatch(fetchCoursesFail(err));
        });
    }
}