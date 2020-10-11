import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

function valuetext(value) {
    return `${value}°C`;
}

export default function DiscreteSlider(props) {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <Typography id="discrete-slider" gutterBottom>
            Difficulty Level
      </Typography>
            <Slider
                classes={{colorPrimary: 'red'}}
                defaultValue={30}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={100}
            />
            <Typography id="discrete-slider" gutterBottom>
            Content Density
      </Typography>
            <Slider
                defaultValue={30}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={100}
            />
            <Typography id="discrete-slider" gutterBottom>
            Content Update
      </Typography>
            <Slider
                defaultValue={30}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={100}
            />
            <Typography id="discrete-slider" gutterBottom>
            Satisfaction
      </Typography>
            <Slider
                defaultValue={30}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={100}
            />
            
        </div>
    );
}