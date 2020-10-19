import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Box , Paper, Typography} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/auth';
import { connect } from 'react-redux';
import Copyright from '../../../components/Copyright/Copyright';
import RateForm from '../../../components/RateForm/RateForm';
import Rating from '../../../components/Rating/Rating';
const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    paper: {
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        margin: '20px 0px',
        width: '100%'
      },
      title: {
        fontWeight: 'bold'
      },
}));

function FavoritePage(props) {
    const classes = useStyles();

    return (
        <Grid container spacing={1}>
            <Grid item lg={12} md={8} sm={9}>
                <main className={classes.content}>
                    <Toolbar />

                    {localStorage.getItem('token') !== null?
                        (<Grid container spacing={1}>
                            <Grid item lg={2}>
                            </Grid>
                            <Grid item lg={8}>
                                <Paper className={classes.paper} elevation={10}>
                                    <Typography align="center" variant="h5" className={classes.title} >
                                      My Ratings
          </Typography>
                                    <Rating isMyRating={true}/>
                                    <Rating isMyRating={true}/>
                                    <Rating isMyRating={true}/>
                                </Paper>
                            </Grid>
                        </Grid>) : <Redirect to='/signin' />}

                    <Grid item lg={12}>
                        <Box mt={8}>
                            <Copyright />
                        </Box>
                    </Grid>
                </main>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        username: state.auth.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) =>
            dispatch(actions.authSignIn(username, password)),
        onInit: () =>
            dispatch(actions.authInitite())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FavoritePage);
