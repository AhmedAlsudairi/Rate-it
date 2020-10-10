import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import ProgressBar from '../../../components/ProgressBar/ProgressBar'
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Accordion from '../../../components/Accordion/Accordion'
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function CoursePage(props) {
  const classes = useStyles();
  let course = props.selectedCourse;
  if (course === null) {
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
        <Grid item lg={6}>
          <Typography align='left' color='primary' variant='h3'>
            {course.id}
          </Typography>

          <Typography align='left' color='secondary' variant='h4'>
            {course.name}
          </Typography>

          <Typography align='left' color='primary' variant='h4'>
            Level: {course.level}
          </Typography>

        </Grid>
        <Grid item lg={2}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            fullWidth
            startIcon={<RateReviewIcon />}
          >Rate It!</Button>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            className={classes.button}
            startIcon={<FavoriteIcon />}
          >Add To Favorite</Button>

        </Grid>
        <Grid item lg={2}>
        </Grid>
        <Grid item lg={2}>
        </Grid>
        <Grid item lg={8}>
          <Typography>Total Rate:</Typography>
          <ProgressBar/>
          <Accordion/>
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

