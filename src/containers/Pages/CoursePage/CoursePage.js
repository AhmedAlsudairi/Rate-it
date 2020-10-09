import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import {  Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import {connect} from 'react-redux';
import Slider from '../../../components/Slider/Slider'
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function CoursePage(props) {
  const classes = useStyles();
  let course = props.selectedCourse;
  if(course===null){
    course = JSON.parse(localStorage.getItem('course'));
  }

  console.log(course);
  return (
      
          <main className={classes.content}>
              <Toolbar />
              <Grid container spacing={1}>
        <Grid item lg={2}>
           <p></p> J
        </Grid>
        <Grid item lg={8}>
          <Typography align='left' color='primary' variant='h3'>
              {course.id}
          </Typography>
            
          <Typography align='left' color='secondary' variant='h4'>
              {course.name}
          </Typography>

           <Typography align='left' color='primary' variant='h4'>
              Level: {course.level}
          </Typography> 
          <Slider/>
        </Grid>
        <Grid item lg={2}>
           <p></p> J
        </Grid>
        </Grid >
        </main>
      
  );
}



const mapStateToProps = state => {
  return {
    loading: state.courses.loading,
    error: state.courses.error,
    selectedCourse: state.courses.selectedCourse
  };
};


export default connect(
  mapStateToProps,
  null
)(CoursePage);

