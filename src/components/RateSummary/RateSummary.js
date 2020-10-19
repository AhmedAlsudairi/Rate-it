import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ProgressBar from '..//ProgressBar/ProgressBar'
import { Paper } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper:{
    padding: 30,
    margin: '20px 0px',
    width: '100%'
  },
  title:{
    fontWeight: 'bold'
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  difficultyLevelPrimary:{
    backgroundColor: 'red'
  },
  difficultyLevelSecondary:{
    backgroundColor: '#dfb2b2'
  },
  contentDensityPrimary:{
    backgroundColor: '#f6e300'
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
        <Paper className={classes.paper} elevation={10}>
            <Typography align="center" variant="h5" className={classes.title}>Current Rate</Typography>
        <Typography className={classes.heading}>Total Rate</Typography>
          <ProgressBar value={props.totalRate}/>
          <Typography className={classes.heading}>Difficulty Level</Typography>
        <ProgressBar value={props.difficulty} classes={{colorPrimary: classes.difficultyLevelSecondary, barColorPrimary: classes.difficultyLevelPrimary}}/>
          <Typography  className={classes.heading}>Content Density</Typography>
            <ProgressBar value={props.density} classes={{colorPrimary: classes.contentDensitySecondary, barColorPrimary: classes.contentDensityPrimary}}/>
          <Typography className={classes.heading}>Content Update</Typography>
        <ProgressBar value={props.update} classes={{colorPrimary: classes.contentUpdateSecondary, barColorPrimary: classes.contentUpdatePrimary}}/>
          <Typography className={classes.heading}>Satisfaction</Typography>
        <ProgressBar value={props.satisfaction} classes={{colorPrimary: classes.SatisfactionSecondary, barColorPrimary: classes.SatisfactionPrimary}}/>
        </Paper>
    </div>
  );
}