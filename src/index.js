import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware,compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import coursesReducer from './store/reducers/courses';
import favoriteReducer from './store/reducers/favorite';
import ratingReducer from './store/reducers/rating';
import myRatingsReducer from './store/reducers/myRatings';
import notificationsReducer from './store/reducers/notifications';

const rootReducer = combineReducers({
  auth: authReducer,
  courses: coursesReducer,
  favorite: favoriteReducer,
  rating: ratingReducer,
  myRatings: myRatingsReducer,
  notifications: notificationsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store= createStore(rootReducer,composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
