import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/styles';
import { connect } from 'react-redux';
const useStyles = makeStyles((theme) => ({
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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
    buttons: {}
}));


function valuetext(value) {
    return `${value}°C`;
}



function DiscreteSlider(props) {
    const classes = useStyles();
    const [difficultyLevel,setDifficultyLevel] = useState(30);
    const [contentDensity,setContentDensity] = useState(30);
    const [contentUpdate,setContentUpdate] = useState(30);
    const [satisfaction,setSatisfaction] = useState(30);

    let course = props.selectedCourse;
    if (course === null) {
        course = JSON.parse(localStorage.getItem('course'));
    }

    const onDifficultyLevelChange = (event,value) => {
        setDifficultyLevel(value)
    }

    const onContentDensityChange = (event,value) => {
        setContentDensity(value)
    }

    const onContentUpdateChange = (event,value) => {
        setContentUpdate(value)
    }

    const onSatisfactionChange = (event,value) => {
        setSatisfaction(value)
    }
    
    const submitHandler = event => {
        event.preventDefault();
        const average = (difficultyLevel+contentDensity+contentUpdate+satisfaction) / 100;
        
    };

    const cancelHandler = event => {
        event.preventDefault();
        // props.onAuth(username.value, password.value);
    };

    return (
        <div className={classes.root} >
            <Grid container spacing={1}>
                <Grid item lg={3} md={4} sm={3}></Grid>
                <Grid item lg={6} md={4} sm={3}>
                    <Grid item lg={12} md={4} sm={3}>
                        <Typography variant="h3">Rate {course.course_id} </Typography>
                        <Typography variant="h5" color="textSecondary">Plese fill the form to post the rate:</Typography>
                    </Grid>
                    <Grid item lg={12} md={4} sm={3}>
                        <Typography id="discrete-slider" gutterBottom>
                            Difficulty Level
      </Typography>
                        <Slider
                        onChange={onDifficultyLevelChange}
                            defaultValue={30}
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
                        onChange={onContentDensityChange}
                            defaultValue={30}
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
                        onChange={onContentUpdateChange}
                            defaultValue={30}
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
                        onChange={onSatisfactionChange}
                            defaultValue={30}
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
                    <Grid item lg={8} md={4} sm={3} className={classes.root}>
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={cancelHandler}
                            disabled={false}
                        >
                            Cancel
      </Button>
                    </Grid>
                </Grid>
                <Grid item lg={3} md={4} sm={3}></Grid>

            </Grid>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        selectedCourse: state.courses.selectedCourse
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DiscreteSlider);