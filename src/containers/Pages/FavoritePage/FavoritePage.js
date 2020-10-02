import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import SideDrawer from '../../../components/SideDrawer/SideDrawer';
import { Hidden, Grid } from '@material-ui/core';
import Courses from '../../../components/Courses/Courses';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/auth';
import {connect} from 'react-redux';
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function FavoritePage(props) {
  const classes = useStyles();

  return (
      <Grid container spacing={1}>
        <Grid item lg={3} md={4} sm={3}>
            <SideDrawer isFavorite={true}/>
        </Grid>
        <Grid item lg={9} md={8} sm={9}>
          <main className={classes.content}>
            <Toolbar />

  {localStorage.getItem('token')!==null? <div><Courses/> <p>{props.username}</p></div> : <Redirect to='/signin'/> }
          </main>
        </Grid>
      </Grid>
  );
}

const mapStateToProps = state => {
    return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.token !== null,
      username: state.auth.username
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onAuth: (username, password) =>
        dispatch(actions.authSignIn(username,password)),
      onInit: ()=>
        dispatch(actions.authInitite())  
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(FavoritePage);
  