import React, { useEffect,useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Course from './Course/Course';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/courses';

import CircularProgress from '@material-ui/core/CircularProgress';
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

  const { onFetchCourses } = props;
  const { courses } = props;
  useEffect(() => {
    onFetchCourses();
  }, [onFetchCourses]);


  let fetchedCourses = <CircularProgress />;
  
  if (!props.loading) {
    console.log(props.courses);
    fetchedCourses = courses.length;
    console.log(fetchedCourses);
  }
  return (
    <div className={classes.root}>
      {/* {courses} */}
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

