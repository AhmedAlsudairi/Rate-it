import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Box ,Typography} from '@material-ui/core';
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
          <Typography variant="h3">Department of Software Engineering</Typography>
          
        </main>
      </Grid>
      <Grid item lg={3} md={8} sm={9}>

      </Grid>

      <Grid item lg={3} md={4} sm={3}>
      
      </Grid>
      <Grid item lg={6} md={8} sm={9}>
        
          <Toolbar />
          <Typography variant="body1">The Software Engineering Department is one of the most modern departments, as it is the latest department of the College of Computer and Information Sciences (CCIS). This department was established with the aim of contributing to the achievement of national strategic goals by graduating generations capable of producing and exporting technology, as well as the ability to respond to the rapid changes in the techniques and tools of software analysis, design, construction, and maintenance.
 
 The discipline of software engineering concerns the application of systematic and disciplined methods of design, development, and maintenance of software. A software engineering specialist must have a solid knowledge base in different theoretical aspects such as mathematics, algorithms analysis, and statistics.
  
 The department's curriculum focus on different software development methodologies, techniques in developing and maintaining software, methods in developing and managing requirements, techniques and methods in software design and architecture. In addition, the curriculum focuses on software verification and validation at various levels and stages of the system development life cycle. Furthermore, an emphasis is placed on methodologies, methods, techniques, and tools for managing software projects.
  
 Our internationally recognized faculty members are diverse and participate in research, teaching, community services and interdisciplinary initiatives in local, national and international communities.
  
 The software engineering department is committed to staying in line with the theoretical and practical aspects of the software industry in order to produce highly qualified software engineers to serve the labor market in Suadi Arabia. In order to meet our scientific commitments and professional development, the SWE Department has taken a number of non-academic initiatives to enlighten CCIS students about the latest hot topics in software requirements, cloud computing, computer service architecture, human and computer interaction, command, and control systems.</Typography>

        
      </Grid>
      
      <Grid item lg={3} md={8} sm={9}>

      </Grid>

      <Grid item lg={3} md={4} sm={3}>
      
      </Grid>
      <Grid item lg={6} md={8} sm={9}>
        
          <Toolbar />
          <Typography>website of Department of Software Engineering: <a href="https://ccis.ksu.edu.sa/en/se"> https://ccis.ksu.edu.sa/en/se </a></Typography>
          <Typography>Location of Department of Software Engineering:</Typography>
          <Map/>
          <Box mt={8}>
            <Copyright />
          </Box>
      </Grid>
      <Grid item lg={3} md={8} sm={9}>

      </Grid>
    </Grid>
  );
}

