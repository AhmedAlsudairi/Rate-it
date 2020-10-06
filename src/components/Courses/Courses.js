import React, { useEffect } from 'react';
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
    fetchedCourses = courses.map(course=>{
      console.log(course.course_id);
      return(
      <Grid item xs={4} key={course.course_id}>
      <Course 
      id={course.course_id}
      name={course.name}
      level={course.level}
      content_density={course.content_density}
      content_update={course.content_update}
      difficulty_level={course.difficulty_level}
      satisfaction={course.satisfaction}
      total_rate={course.total_rate}
      /></Grid>
      
    )});
  }
  return (
    <div className={classes.root}>
      
      <Grid container spacing={3}>
      {fetchedCourses}
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

