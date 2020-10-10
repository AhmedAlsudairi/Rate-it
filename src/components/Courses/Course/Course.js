import React from 'react';
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
import * as actions from '../../../store/actions/courses';


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
  return (
    <Card className={classes.root}>
        
      <CardActionArea component={Link} to={'/coursepage'} onClick={()=>{props.onSelectCourse(props)}}>
        <CardMedia 
          className={classes.media}
          image="./swe_img.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.id}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectCourse: (course) => {
      dispatch(actions.selectCourse(course))
    }  
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Course);

