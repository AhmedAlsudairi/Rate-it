import React, { useEffect,useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Course from './Course/Course';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/courses';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Courses(props) {
  const classes = useStyles();

  useCallback()
  useEffect(()=>{
    props.onFetchCourses();
  },[]);
  
  return (
    <div className={classes.root}>
      
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Course />
        </Grid>
        <Grid item xs={4}>
          <Course />
        </Grid>
        <Grid item xs={4}>
          <Course />
        </Grid>
      </Grid>
      
     
    </div>
  );
}


const mapStateToProps = state => {
  return {
    loading: state.courses.loading,
    error: state.courses.error,
    courses: state.courses.courses,
    selectedLevel: state.courses.selectedLevel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCourses: () =>
      dispatch(actions.fetchCourses()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);

