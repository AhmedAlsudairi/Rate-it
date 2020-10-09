import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import {  Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/courses';
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function CoursePage(props) {
  const classes = useStyles();

  return (
      
          <main className={classes.content}>
              <Toolbar />
              <Grid container spacing={1}>
        <Grid item lg={2}>
           <p></p> J
        </Grid>
        <Grid item lg={8}>
          <Typography align='left' color='primary' variant='h3'>
              {props.selectedCourse.id}
          </Typography>
            
          <Typography align='left' color='secondary' variant='h4'>
              {props.selectedCourse.name}
          </Typography>

           <Typography align='left' color='primary' variant='h4'>
              Level: {props.selectedCourse.level}
          </Typography> 
          
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

