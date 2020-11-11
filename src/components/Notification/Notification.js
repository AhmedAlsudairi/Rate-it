import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import * as notifications from '../../store/actions/notifications';

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

    

  return (
    <div className={classes.root}>
      <Paper variant="outlined"  className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item lg={10}>
            <Typography variant="h5">{props.notification.course_id} receive new rating!</Typography>
          </Grid>

          
            <Grid item lg={2}>
              <Button
                 variant="contained"
                 color="default"
                edge="start"
                className={classes.accountButton}
                aria-label="open drawer"
                onClick={()=> props.onDeleteNotification(props.username,props.notification.notify_id)}
              >
                Dismiss
              </Button>
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
    loading: state.notifications.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteNotification: (username, notifyId) =>
      dispatch(notifications.deleteNotifications(username,notifyId)),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rating);
