import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Rating from '../../../components/Rating/Rating';
import RatingSummary from '../../../components/RateSummary/RateSummary';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Copyright from '../../../components/Copyright/Copyright';
import * as favoriteActions from '../../../store/actions/favorite';
import * as ratingActions from '../../../store/actions/rating';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    margin: '20px 0px',
    width: '100%'
  },
  title: {
    fontWeight: 'bold'
  },
    empty: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 100,
      margin: 100
    }
}));

function CoursePage(props) {
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState(false)
  const [isRated, setIsRated] = useState(false)
  let course = props.selectedCourse;
  if (course === null) {
    course = JSON.parse(localStorage.getItem('course'));
  }

  let {favoriteIDs}= props
  let {ratings}= props
  useEffect(()=>{
    setIsFavorite(favoriteIDs.includes(course.course_id))
    
    
    for(const rating of ratings){
      if(rating.user_id===props.username&&rating.course_id===course.course_id){
        setIsRated(true);
      }
    }
    props.onFetchRatings(course.course_id)
  },[favoriteIDs,course.course_id,props.onFetchRatings,ratings,course,props.username,props])

  return (

    <main className={classes.content}>
      <Toolbar />
      <Grid container spacing={1}>
        
        <Grid item lg={2}>
        </Grid>
        <Grid item lg={6}>
          <Typography align='left' color='textPrimary' variant='h3'>
            {course.course_id}
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
            disabled={isRated}
            onClick={()=>props.history.push('/rate_form')}
          >Rate It!
          </Button>
          
          {isFavorite ?
            <Button
            onClick={()=>{props.onRemoveFavorite(props.selectedCourse,props.token)}}
              variant="contained"
              style={{backgroundColor: '#bc0000', color: 'white'}}
              fullWidth
              className={classes.button}
              startIcon={<DeleteIcon />}
            >Remove Favorite</Button> :
            <Button
            onClick={() => { props.isAuthenticated? props.onAddFavorite(props.selectedCourse,props.token): props.history.push('/signin') }}
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.button}
              startIcon={<FavoriteIcon />}
            >Add To Favorite</Button>}


        </Grid>
        <Grid item lg={2}>
        </Grid>
        <Grid item lg={2}>
        </Grid>
        <Grid item lg={8}>
          <RatingSummary 
          totalRate={course.total_rate}
          difficulty={course.difficulty_level}
          density={course.content_density}
          update={course.content_update}
          satisfaction={course.satisfaction}
          className={classes.paper}
           />
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
          {props.ratings.length=== 0? <Typography variant='h5' className={classes.empty} align='center'>{course.course_id} didn't have any rating!</Typography>:null}
            {props.ratings!==null? props.ratings.map((item)=>{
             return <Rating key={item.user_id} rating={item}/>;
            }) : null}
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
    favorite: state.favorite.favorite,
    favoriteIDs: state.favorite.favoriteIDs,
    token: state.auth.token,
    username: state.auth.username,
    ratings: state.rating.rating,
    ratingError: state.rating.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddFavorite: (course,token) => {
      dispatch(favoriteActions.addFavorite(course,token))
    },
    onRemoveFavorite: (course,token) => {
      dispatch(favoriteActions.removeFavorite(course,token))
    },
    onFetchRatings: (course) => {
      dispatch(ratingActions.fetchRatings(course))
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursePage);

