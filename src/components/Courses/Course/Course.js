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
import { Link, withRouter } from 'react-router-dom';
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
  let {favoriteIDs}= props
  useEffect(()=>{
    setIsFavorite(favoriteIDs.includes(props.course.course_id))
  },[favoriteIDs,props.course.course_id])
  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={'/coursepage'} onClick={()=>{props.onSelectCourse(props.course)}}>
        <CardMedia 
        //logo.png
          image={require('./logo.png')}
          className={classes.media}
          title={props.course.name}
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
      {isFavorite&&props.isAuthenticated? 
      <IconButton onClick={()=>{props.onRemoveFavorite(props.course,props.token)}} aria-label="remove from favorites">
      <FavoriteIcon color="secondary"/>
    </IconButton> : 
      <IconButton onClick={() => { props.isAuthenticated? props.onAddFavorite(props.course,props.token): props.history.push('/signin') }} aria-label="add to favorites">
          <FavoriteBorderIcon />
        </IconButton>}
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
    favorite: state.favorite.favorite,
    favoriteIDs: state.favorite.favoriteIDs,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectCourse: (course) => {
      dispatch(courseActions.selectCourse(course))
    },
    onAddFavorite: (course,token) => {
      dispatch(favoriteActions.addFavorite(course,token))
    },
    onRemoveFavorite: (course,token) => {
      dispatch(favoriteActions.removeFavorite(course,token))
    },
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Course));

