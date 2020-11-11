import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Box ,Typography} from '@material-ui/core';
import Copyright from '../../../components/Copyright/Copyright';
import Map from '../../../components/Map/Map';
import {connect} from 'react-redux';
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Profile(props) {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item lg={3} md={4} sm={3}>
      
      </Grid>
      <Grid item lg={6} md={8} sm={9}>
        <main className={classes.content}>
          <Toolbar />
          <Typography variant="h3">My profile</Typography>
          <Toolbar />
          <Toolbar />
          <Typography variant="body1"><strong>username: </strong>{props.username}</Typography>
        </main>
      </Grid>
      <Grid item lg={3} md={8} sm={9}>

      </Grid>


      <Grid item lg={3} md={4} sm={3}>
      
      </Grid>
      <Grid item lg={6} md={8} sm={9}>
        
          <Toolbar />
         
         
          <Box mt={8}>
            <Copyright />
          </Box>
      </Grid>
      <Grid item lg={3} md={8} sm={9}>

      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
    };
};



export default connect(
    mapStateToProps
)(Profile);
