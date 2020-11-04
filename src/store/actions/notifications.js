import * as actionTypes from './actionsTypes';
import axios from 'axios';


export const fetchNotificationsStart = () => {
    return {
        type: actionTypes.FETCH_NOTIFICATIONS_START
    }
}

export const fetchNotificationsSuccess = (notifications,num_of_notifications) => {
    return {
        type: actionTypes.FETCH_NOTIFICATIONS_SUCCESS,
        notifications: notifications,
        num_of_notifications: num_of_notifications
    }
}

export const fetchNotificationsFail = (error) => {
    return{
        type: actionTypes.FETCH_NOTIFICATIONS_FAIL,
        error: error
    }
}


export const fetchCourses = (username) => {
    return dispatch => {
        dispatch(fetchNotificationsStart());
        
        axios.get('http://127.0.0.1:5000/notifications?username='+username)
        .then(res => {
            let notifications = [];
            notifications=[...res.data];
            let num_of_notifications=res.data
            dispatch(fetchNotificationsSuccess(notifications,num_of_notifications));
            
        })
        .catch(err=>{
            dispatch(fetchNotificationsFail(err));
        });
    }
}