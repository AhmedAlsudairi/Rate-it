import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme)=>({
    root: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    comment: {
        width: '100%',
        margin: 10
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
      },
}));

function valuetext(value) {
    return `${value}°C`;
}

const submitHandler = event => {
    event.preventDefault();
    // props.onAuth(username.value, password.value);
  };

export default function DiscreteSlider(props) {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <Grid container spacing={1}>
                <Grid item lg={3} md={4} sm={3}></Grid>
                <Grid item lg={6} md={4} sm={3}>
                <Grid item lg={12} md={4} sm={3}>
                    <Typography variant="h3">Rate Form</Typography>
                    <Typography variant="h5" color="textSecondary">Plese fill the form to post the rate:</Typography>
                </Grid>
                    <Grid item lg={12} md={4} sm={3}>
                        <Typography id="discrete-slider" gutterBottom>
                            Difficulty Level
      </Typography>
                        <Slider
                            classes={{ colorPrimary: 'red' }}
                            defaultValue={30}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={100}
                        />
                    </Grid>
                    <Grid item lg={12} md={4} sm={3}>
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
                    </Grid>
                    <Grid item lg={12} md={4} sm={3}>
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
                    </Grid>
                    <Grid item lg={12} md={4} sm={3}>
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
                    </Grid>
                    <Grid item lg={12} md={4} sm={3}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Comment"
                            multiline
                            rows={4}
                            placeholder="Write comment..."
                            variant="outlined"
                            className={classes.comment}
                        />
                    </Grid>
                    <Grid item lg={12} md={4} sm={3}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={submitHandler}
                            disabled={false}
                        >
                            Post Rate
      </Button>
                    </Grid>
                </Grid>
                <Grid item lg={3} md={4} sm={3}></Grid>

            </Grid>
        </div>
    );
}