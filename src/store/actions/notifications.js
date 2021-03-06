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


export const fetchNotifications = (username) => {
    console.log(username);
    return dispatch => {
        dispatch(fetchNotificationsStart());
        
        axios.get('https://rateitbackend.herokuapp.com/notifications?username='+username)
        .then(res => {
            console.log(res.data);
            let notifications = [];
            notifications=[...res.data.notifications];
            let num_of_notifications=res.data.num_of_notifications;
            dispatch(fetchNotificationsSuccess(notifications,num_of_notifications));
            
        })
        .catch(err=>{
            dispatch(fetchNotificationsFail(err));
        });
    }
}

export const deleteNotifications = (username,notifyId) => {
    console.log(username,notifyId);
    return dispatch => {
        dispatch(fetchNotificationsStart());
        
        axios.delete(`https://rateitbackend.herokuapp.com/notifications?username=${username}&notify_id=${notifyId}`)
        .then(res => {
            console.log(res.data);
            let notifications = [];
            notifications=[...res.data.notifications];
            let num_of_notifications=res.data.num_of_notifications;
            dispatch(fetchNotificationsSuccess(notifications,num_of_notifications));
            
        })
        .catch(err=>{
            dispatch(fetchNotificationsFail(err));
        });
    }
}