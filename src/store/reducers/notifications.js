import * as actionTypes from '../actions/actionsTypes';

const initalState = {
    notifications: [],
    num_of_notifications: 0,
    loading: false,
    error: null,
}

const notificationsStart = (state,action) => {
    return {...state,...{loading: true, error: null}};
}

const notificationsSuccess = (state,action) => {
    return {...state,...{notifications: action.notifications, num_of_notifications: action.num_of_notifications, error: null, loading: false}};
}

const notificationsFail = (state,action) => {
    return {...state,...{error: action.error, loading: false}};
}

const notificationsReducer = (state = initalState, action) => {
   switch(action.type){
       case actionTypes.FETCH_NOTIFICATIONS_START: return notificationsStart(state,action);
       case actionTypes.FETCH_NOTIFICATIONS_SUCCESS: return notificationsSuccess(state,action);
       case actionTypes.FETCH_NOTIFICATIONS_FAIL: return notificationsFail(state,action);
       default: return state;
   }
}

export default notificationsReducer;