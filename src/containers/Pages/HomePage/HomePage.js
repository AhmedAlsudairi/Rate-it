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

export default function HomePage(props) {
  const classes = useStyles();

  return (
      <Grid container spacing={1}>
        <Grid item lg={3} md={4} sm={3}>
            <SideDrawer />
        </Grid>
        <Grid item lg={9} md={8} sm={9}>
          <main className={classes.content}>
            <Toolbar />

            <Courses/>
          </main>
        </Grid>
      </Grid>
  );
}
