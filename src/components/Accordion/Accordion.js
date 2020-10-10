import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProgressBar from '..//ProgressBar/ProgressBar'
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

export default function SimpleAccordion() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Difficulty Level</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <ProgressBar classes={{colorPrimary: classes.difficultyLevelSecondary, barColorPrimary: classes.difficultyLevelPrimary}}/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Content Density</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <ProgressBar classes={{colorPrimary: classes.contentDensitySecondary, barColorPrimary: classes.contentDensityPrimary}}/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Content Update</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <ProgressBar classes={{colorPrimary: classes.contentUpdateSecondary, barColorPrimary: classes.contentUpdatePrimary}}/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Satisfaction</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <ProgressBar classes={{colorPrimary: classes.SatisfactionSecondary, barColorPrimary: classes.SatisfactionPrimary}}/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}