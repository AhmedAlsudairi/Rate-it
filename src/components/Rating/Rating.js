import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography, IconButton } from '@material-ui/core';
import ProgressBar from '../ProgressBar/ProgressBar';
import Accordion from '../Accordion/Accordion';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import * as myRatings from '../../store/actions/myRatings';
import * as rating from '../../store/actions/rating';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%'
    },

  },
  paper: {
    padding: 30,
    margin: '20px 0px',
    width: '100%'
  },
  accountButton: {
    marginLeft: theme.spacing(2),

  },
  span: {
    fontWeight: 'bold',
    marginLeft: 10
  },
  rateSection: {

    marginTop: 10,
    marginBottom: 10
  }
}));

function Rating(props) {
  const classes = useStyles();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSameUser, setIsSameUser] = useState(false)

  useEffect(() => {
    setIsLiked(props.rating.liked_by.includes(props.username));
    setIsDisliked(props.rating.disliked_by.includes(props.username));

    
      if (props.rating.user_id === props.username) {
        setIsSameUser(true);
      }
    

  }, [props.rating.liked_by, props.rating.disliked_by,props.rating.user_id,props.username])

  const onRemoveRatingHandler = () => {
    props.onRemoveRating(props.username, props.rating.course_id);
  }

  const onLikeOrDislikeRatingHandler = (liked_by, disliked_by) => {
    props.onLikeOrDislikeRating(props.rating.user_id, props.rating.course_id, liked_by, disliked_by);
  }

  return (
    <div className={classes.root}>
      <Paper variant="outlined" square className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item lg={9}>
            <Typography variant="h5">{props.isMyRating ? props.rating.course_id : props.rating.user_id}</Typography>
          </Grid>

          {props.isMyRating ?
            <Grid item lg={3}>
              <IconButton

                edge="start"
                className={classes.accountButton}
                color="inherit"
                aria-label="open drawer"
                onClick={onRemoveRatingHandler}
              >
                <DeleteIcon />
              </IconButton>
            </Grid> :
            <Grid item lg={3}>
              <IconButton

                edge="start"
                className={classes.accountButton}
                color="inherit"
                aria-label="open drawer"
                onClick={() => onLikeOrDislikeRatingHandler(props.username, "")}
                disabled={isLiked||isSameUser}
              >
                <ThumbUpAltIcon />
              </IconButton>
              <span className={classes.span}>{props.rating.num_of_likes}</span>
              <IconButton

                edge="start"
                className={classes.accountButton}
                color="inherit"
                aria-label="open drawer"
                onClick={() => onLikeOrDislikeRatingHandler("", props.username)}
                disabled={isDisliked||isSameUser}
              >
                <ThumbDownIcon />
              </IconButton>
            </Grid>}

          <Grid item lg={12} className={classes.rateSection}>
            <Typography variant="h6">Total Rate</Typography>
            <ProgressBar value={props.rating.total_rate} />
          </Grid>
          <Grid item lg={12} className={classes.rateSection}>
            <Typography variant="h6">Comment</Typography>
            <Typography>{props.rating.comment}</Typography>
          </Grid>
          <Grid item lg={12} className={classes.rateSection}>
            <Accordion rating={props.rating} />
          </Grid>

        </Grid>


      </Paper>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    username: state.auth.username,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRemoveRating: (username, course) =>
      dispatch(myRatings.removeRating(username, course)),
    onLikeOrDislikeRating: (username, course, liked_by, disliked_by) =>
      dispatch(rating.likeOrDislikeRating(username, course, liked_by, disliked_by)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rating);
