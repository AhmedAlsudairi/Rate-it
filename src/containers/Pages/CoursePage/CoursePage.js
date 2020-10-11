import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import ProgressBar from '../../../components/ProgressBar/ProgressBar'
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Accordion from '../../../components/Accordion/Accordion';
import Rating from '../../../components/Rating/Rating';
import RatingSummary from '../../../components/RateSummary/RateSummary';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Copyright from '../../../components/Copyright/Copyright';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: 10,
    margin: '20px 0px',
    width: '100%'
  },
  title: {
    fontWeight: 'bold'
  },
}));

function CoursePage(props) {
  const classes = useStyles();
  const [isFavorite,setIsFavorite] = useState(false)

  let course = props.selectedCourse;
  if (course === null) {
    course = JSON.parse(localStorage.getItem('course'));
  }

  let {favorite}= props
  useEffect(()=>{
    console.log(favorite);
    console.log(course.course_id);
    console.log(favorite.includes(course.course_id));
    setIsFavorite(favorite.includes(course.course_id))
  },[favorite,course])
  return (

    <main className={classes.content}>
      <Toolbar />
      <Grid container spacing={1}>
        <Grid item lg={2}>
        </Grid>
        <Grid item lg={6}>
          <Typography align='left' color='textPrimary' variant='h3'>
            {course.id}
          </Typography>
    
          <Typography align='left' color='error' variant='h4'>
            {course.name}
          </Typography>

          <Typography align='left' color='textSecondary' variant='h5'>
            Level {course.level}
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
          {isFavorite?
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            className={classes.button}
            startIcon={<DeleteIcon />}
          >Remove Favorite</Button>:
         <Button
            variant="contained"
            color="secondary"
            fullWidth
            className={classes.button}
            startIcon={<FavoriteIcon />}
          >Add To Favorite</Button> }
          

        </Grid>
        <Grid item lg={2}>
        </Grid>
        <Grid item lg={2}>
        </Grid>
        <Grid item lg={8}>
          <RatingSummary className={classes.paper} />
        </Grid>
        <Grid item lg={2}>
        </Grid>
        <Grid item lg={2}>
        </Grid>
        <Grid item lg={8}>
          <Paper className={classes.paper} elevation={10}>
            <Typography align="center" variant="h5" className={classes.title} >
              Ratings
          </Typography>
            <Rating />
            <Rating />
            <Rating />
          </Paper>

        <Box mt={8}>
          <Copyright />
        </Box>
        </Grid>
      </Grid >
    </main>

  );
}


const mapStateToProps = state => {
  return {
    loading: state.courses.loading,
    error: state.courses.error,
    selectedCourse: state.courses.selectedCourse,
    isAuthenticated: state.auth.token !== null,
    favorite: state.favorite.favorite
  };
};


export default connect(
  mapStateToProps,
  null
)(CoursePage);

