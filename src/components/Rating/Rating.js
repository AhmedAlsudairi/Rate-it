import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

export default function Rating(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper variant="outlined" square > {props.children} </Paper>
    </div>
  );
}