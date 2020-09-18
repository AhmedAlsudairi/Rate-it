import React, { useState } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import Copyright from '../../../components/Copyright/Copyright';
import * as actions from '../../../store/actions/auth';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    marginTop: 100
  }
}));

function SignUp(props) {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(false);
  const usernameInputHandler = (event) => {
    console.log(event.target.value);
    setUsername(event.target.value);
  }

  const passwordInputHandler = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  }

  const confirmPasswordInputHandler = (event) => {
    console.log(event.target.value);
    setConfirmPassword(event.target.value);
  }

  const emailInputHandler = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  }

  const submitHandler = event => {
    event.preventDefault();

    if(password !== confirmPassword){
      return;
    }
    props.onAuth(username, password, email);
  };

  
  let form = (<div className={classes.paper}>
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign up
    </Typography>
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="username"
            name="username"
            variant="outlined"
            required
            fullWidth
            id="username"
            label="Username"
            autoFocus
            onChange={(event) => { usernameInputHandler(event) }}
            value={username}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(event) => { emailInputHandler(event) }}
            value={email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => { passwordInputHandler(event) }}
            value={password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="ConfirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            onChange={(event) => { confirmPasswordInputHandler(event) }}
            value={confirmPassword}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={submitHandler}
        disabled={valid}
      >
        Sign Up
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <Link to='/signin'>
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </form>
  </div>);

  if (props.loading) {
    form = (<div className={classes.paper}><CircularProgress /></div>);
  }
  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
    {form}
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password, email) =>
      dispatch(actions.authSignUp(username, password, email))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);