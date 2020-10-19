import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions/rating';
import { Paper } from '@material-ui/core';
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
    paper: {
        padding: 20,
        margin: '20px 0px',
        width: '100%'
      },
}));



function DiscreteSlider(props) {
    const classes = useStyles();
    const [difficultyLevel, setDifficultyLevel] = useState(30);
    const [contentDensity, setContentDensity] = useState(30);
    const [contentUpdate, setContentUpdate] = useState(30);
    const [satisfaction, setSatisfaction] = useState(30);
    const [comment, setComment] = useState('');
    let course = props.selectedCourse;
    if (course === null) {
        course = JSON.parse(localStorage.getItem('course'));
    }

    const onDifficultyLevelChange = (event, value) => {
        setDifficultyLevel(value)
    }

    const onContentDensityChange = (event, value) => {
        setContentDensity(value)
    }

    const onContentUpdateChange = (event, value) => {
        setContentUpdate(value)
    }

    const onSatisfactionChange = (event, value) => {
        setSatisfaction(value)
    }

    const onCommentChangeHandler = (event) => {
        setComment(event.target.value)
    }
    const submitHandler = event => {
        event.preventDefault();
        const totalRate = (difficultyLevel + contentDensity + contentUpdate + satisfaction) / 4;
        const rate = {
            username: props.username,
            courseID: course.course_id,
            difficultyLevel: difficultyLevel,
            contentDensity: contentDensity,
            contentUpdate: contentUpdate,
            satisfaction: satisfaction,
            totalRate: totalRate,
            comment: comment
        }

        props.onRatePost(rate)
    };

    const cancelHandler = event => {
        event.preventDefault();
        props.history.goBack();
    };

    return (
        <div className={classes.root} >
            <Grid container spacing={1}>
                <Grid item lg={3} ></Grid>
                <Grid item lg={6} >
                    <Grid item lg={12} >
                        <Typography variant="h3">Rate {course.course_id} </Typography>
                        <Typography variant="h5" color="textSecondary">Plese fill the form to post the rate:</Typography>
                    </Grid>
                    <Paper className={classes.paper} elevation={10}>
                    <Grid item lg={12} >
                        <Typography id="discrete-slider" gutterBottom>
                            Difficulty Level
      </Typography>
                        <Slider
                            onChange={onDifficultyLevelChange}
                            defaultValue={30}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={5}
                            marks
                            min={0}
                            max={100}
                            value={difficultyLevel}
                        />
                    </Grid>
                    <Grid item lg={12} >
                        <Typography id="discrete-slider" gutterBottom>
                            Content Density
      </Typography>
                        <Slider
                            onChange={onContentDensityChange}
                            defaultValue={30}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={5}
                            marks
                            min={0}
                            max={100}
                            value={contentDensity}
                        />
                    </Grid>
                    <Grid item lg={12} >
                        <Typography id="discrete-slider" gutterBottom>
                            Content Update
      </Typography>
                        <Slider
                            onChange={onContentUpdateChange}
                            defaultValue={30}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={5}
                            marks
                            min={0}
                            max={100}
                            value={contentUpdate}
                        />
                    </Grid>
                    <Grid item lg={12} >
                        <Typography id="discrete-slider" gutterBottom>
                            Satisfaction
      </Typography>
                        <Slider
                            onChange={onSatisfactionChange}
                            defaultValue={30}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={5}
                            marks
                            min={0}
                            max={100}
                            value={satisfaction}
                        />
                    </Grid>
                    <Grid item lg={11} >
                        <TextField
                        fullWidth
                            id="outlined-multiline-static"
                            label="Comment"
                            multiline
                            rows={4}
                            placeholder="Write comment..."
                            variant="outlined"
                            className={classes.comment}
                            onChange={onCommentChangeHandler}
                        />
                    </Grid>
                    </Paper>
                    <Grid item lg={12} className={classes.root}>
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
                <Grid item lg={3} ></Grid>

            </Grid>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        selectedCourse: state.courses.selectedCourse,
        username: state.auth.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRatePost: (rate) => dispatch(actions.rateProcess(rate))
    };
};
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(DiscreteSlider));