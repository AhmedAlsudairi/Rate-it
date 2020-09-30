import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import SideDrawer from '../../../components/SideDrawer/SideDrawer';
import { Hidden, Grid } from '@material-ui/core';
import Courses from '../../../components/Courses/Courses';


const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function CoursePage(props) {
  const classes = useStyles();

  return (
      
          <main className={classes.content}>
              <Toolbar />
              <Grid container spacing={1}>
        <Grid item lg={2}>
           <p></p> J
        </Grid>
        <Grid item lg={8}>
          
            
            Corse page
          
        </Grid>
        <Grid item lg={2}>
           <p></p> J
        </Grid>
        </Grid >
        </main>
      
  );
}


