import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import SideDrawer from '../../../components/SideDrawer/SideDrawer';
import { Grid, Box ,Typography} from '@material-ui/core';
import Courses from '../../../components/Courses/Courses';
import Copyright from '../../../components/Copyright/Copyright';
import Map from '../../../components/Map/Map';
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
      
      </Grid>
      <Grid item lg={6} md={8} sm={9}>
        <main className={classes.content}>
          <Toolbar />
          <Typography variant="h2">King Saud University</Typography>
          <Typography variant="body1">KSU aims to disseminate and promote knowledge in Saudi Arabia, widening its base of scientific and literary expertise, maintaining a competitive edge with other nations in the fields of Arts and Sciences, and contributing to discovery and invention. In addition, King Saud University strives to contribute to the revival of academic and scientific excellence of Islamic civilization and the articulation of its benefits and glories.</Typography>
          <Typography>Location of King Saud University:</Typography>
          <Map/>
          <Box mt={8}>
            <Copyright />
          </Box>
        </main>
      </Grid>
      <Grid item lg={3} md={8} sm={9}>

      </Grid>
    </Grid>
  );
}

