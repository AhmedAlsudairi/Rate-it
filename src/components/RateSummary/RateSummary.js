import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ProgressBar from '..//ProgressBar/ProgressBar'
import { Paper } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  difficultyLevelPrimary:{
    backgroundColor: 'red'
  },
  difficultyLevelSecondary:{
    backgroundColor: '#dfb2b2'
  },
  contentDensityPrimary:{
    backgroundColor: 'yellow'
  },
  contentDensitySecondary:{
    backgroundColor: '#dedfb2'
  },
  contentUpdatePrimary:{
    backgroundColor: 'purple'
  },
  contentUpdateSecondary:{
    backgroundColor: '#cbb2df'
  },
  SatisfactionPrimary:{
    backgroundColor: 'green'
  },
  SatisfactionSecondary:{
    backgroundColor: '#b3dfb2'
  },

}));

export default function SimpleAccordion(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Paper {...props} elevation={10}>
            <Typography align="center" variant="h5">Current Rate</Typography>
        <Typography>Total Rate</Typography>
          <ProgressBar value={83}/>
          <Typography className={classes.heading}>Difficulty Level</Typography>
        <ProgressBar value={80} classes={{colorPrimary: classes.difficultyLevelSecondary, barColorPrimary: classes.difficultyLevelPrimary}}/>
          <Typography  className={classes.heading}>Content Density</Typography>
            <ProgressBar value={78} classes={{colorPrimary: classes.contentDensitySecondary, barColorPrimary: classes.contentDensityPrimary}}/>
          <Typography className={classes.heading}>Content Update</Typography>
        <ProgressBar value={92} classes={{colorPrimary: classes.contentUpdateSecondary, barColorPrimary: classes.contentUpdatePrimary}}/>
          <Typography className={classes.heading}>Satisfaction</Typography>
        <ProgressBar value={82} classes={{colorPrimary: classes.SatisfactionSecondary, barColorPrimary: classes.SatisfactionPrimary}}/>
        </Paper>
    </div>
  );
}