import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import HomePage from '../Pages/HomePage/HomePage';
import SignInPage from '../Pages/SignInPage/SignInPage';
import SignUpPage from '../Pages/SignUpPage/SignUpPage';
import {Route} from 'react-router-dom';
import Logout from '../Pages/Logout/Logout';
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
     <Route exact path='/' component={HomePage}/>
     <Route exact path='/signin' component={SignInPage}/>
     <Route exact path='/signup' component={SignUpPage}/>
     <Route exact path='/logout' component={Logout}/>
    </div>
  );
}
