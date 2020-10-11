import React , {useState, useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as courseActions from '../../../store/actions/courses';
import * as favoriteActions from '../../../store/actions/favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function Course(props) {
  const classes = useStyles();
  const [isFavorite,setIsFavorite] = useState(false)
  let {favorite}= props
  useEffect(()=>{
    setIsFavorite(favorite.includes(props.course.course_id))
  },[favorite])
  return (
    <Card className={classes.root}>
        
      <CardActionArea component={Link} to={'/coursepage'} onClick={()=>{props.onSelectCourse(props.course)}}>
        <CardMedia 
          className={classes.media}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.course.course_id}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.course.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      {isFavorite? 
      <IconButton onClick={()=>{props.onRemoveFavorite(props.course)}} aria-label="add to favorites">
      <FavoriteIcon />
    </IconButton> : 
      <IconButton onClick={()=>{props.onAddFavorite(props.course)}} aria-label="add to favorites">
          <FavoriteBorderIcon />
        </IconButton>}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
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

const mapDispatchToProps = dispatch => {
  return {
    onSelectCourse: (course) => {
      dispatch(courseActions.selectCourse(course))
    },
    onAddFavorite: (course) => {
      dispatch(favoriteActions.addFavorite(course))
    },
    onRemoveFavorite: (course) => {
      dispatch(favoriteActions.removeFavorite(course))
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course);

