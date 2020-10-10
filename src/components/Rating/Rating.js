import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography, IconButton } from '@material-ui/core';
import ProgressBar from '../ProgressBar/ProgressBar';
import Accordion from '../Accordion/Accordion';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%'
    },
    
  },
  paper:{
      padding: 20,
      margin: '20px 0px',
      width: '100%'
    },
    accountButton: {
      marginLeft: theme.spacing(2),
      
    },
    span:{
      fontWeight: 'bold',
      marginLeft: 10
    }
}));

export default function Rating(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper variant="outlined" square className={classes.paper}>
      <Grid container spacing={1}>
        <Grid item lg={9}>
          <Typography variant="h6">User</Typography>
        </Grid>
        <Grid item lg={3}>
        <IconButton
          
          edge="start"
          className={classes.accountButton}
          color="inherit"
          aria-label="open drawer"
        >
          <ThumbUpAltIcon />
        </IconButton>
        <span className={classes.span}>5</span> 
        <IconButton
          
          edge="start"
          className={classes.accountButton}
          color="inherit"
          aria-label="open drawer"
        >
          <ThumbDownIcon />
        </IconButton>
        </Grid>
        <Grid item lg={12}>
          <Typography variant="h6">Total Rate</Typography>
          <ProgressBar/>
          <Accordion/>
        </Grid>
        <Grid item lg={12}>
          <Typography variant="h6">Comment</Typography>
          <Typography>This is the most good course ever!</Typography>
        </Grid>
      </Grid>
        
        
      </Paper>
    </div>
  );
}