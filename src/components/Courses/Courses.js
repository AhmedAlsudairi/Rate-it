import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Course from './Course/Course';
import {connect} from 'react-redux';
import * as courseActions from '../../store/actions/courses';
import * as favoriteActions from '../../store/actions/favorite';
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
  spinner: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
}));

function Courses(props) {
  const classes = useStyles();

  const { onFetchCourses } = props;
  const { onFetchFavorite } = props;
  const { courses } = props;
  const { favorite } = props;
  useEffect(() => {
   props.isFavorite? onFetchFavorite(props.token) : onFetchCourses(1);
  }, [onFetchCourses,onFetchFavorite,props.isFavorite]);


  
  let fetchedCourses = (<div className={classes.spinner}><CircularProgress/></div>);
  
  if (!props.loading && !props.favLoading) {
    fetchedCourses = props.isFavorite?
    favorite.map(item=>{
      return(
      <Grid item xs={4} key={item.course.course_id}>
      <Course 
      course={item.course}
      /></Grid>
      
    )})
    :
     courses.map(course=>{
      return(
      <Grid item xs={4} key={course.course_id}>
      <Course 
      course={course}
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
    favLoading: state.favorite.loading,
    error: state.courses.error,
    courses: state.courses.courses,
    favorite: state.favorite.favorite,
    selectedLevel: state.courses.selectedLevel,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCourses: (level) =>
      dispatch(courseActions.fetchCourses(level,null)),
    onSelectCourse: (course) => {
      dispatch(courseActions.selectCourse(course))
    },
    onFetchFavorite: (token) => {
      dispatch(favoriteActions.fetchFavorite(token))
    }  
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);

