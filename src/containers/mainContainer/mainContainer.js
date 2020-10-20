import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import HomePage from '../Pages/HomePage/HomePage';
import SignInPage from '../Pages/SignInPage/SignInPage';
import SignUpPage from '../Pages/SignUpPage/SignUpPage';
import { Route, Switch } from 'react-router-dom';
import LogoutPage from '../Pages/LogoutPage/LogoutPage';
import FavoritePage from '../Pages/FavoritePage/FavoritePage';
import CoursePage from '../Pages/CoursePage/CoursePage';
import RatingPage from '../Pages/RatingPage/RatingPage';
import MyRatingsPage from '../Pages/MyRatingsPage/MyRatings';
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MainContainer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavigationBar />

      <Switch>

        <Route exact path='/favorite' component={FavoritePage} />

        <Route exact path='/signin' component={SignInPage} />
        <Route exact path='/signup' component={SignUpPage} />
        <Route exact path='/logout' component={LogoutPage} />

        <Route exact path='/' component={HomePage} />
        <Route exact path='/coursepage' component={CoursePage} />
        <Route exact path='/rate_form' component={RatingPage} />
        <Route exact path='/my_ratings' component={MyRatingsPage} />
      </Switch>

    </div>
  );
}
