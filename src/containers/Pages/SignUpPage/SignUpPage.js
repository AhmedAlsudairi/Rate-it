import React, { useState } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
import Alert from '@material-ui/lab/Alert';
import {Redirect} from 'react-router-dom';
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
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  button: {
    color: 'black'
  }
}));

function SignUp(props) {
  const classes = useStyles();

  const [username, setUsername] = useState({value: '', valid: false});
  const [email, setEmail] = useState({value: '', valid: false, error: false});
  const [password, setPassword] = useState({value: '', valid: false, error: false});
  const [confirmPassword, setConfirmPassword] = useState({value: '', valid: false, error: false});
  

  const usernameInputHandler = (event) => {
    const textValue = event.target.value;
    if(textValue === ''){
      setUsername({value: textValue, valid: false});
      return;
      
    }
    setUsername({value: textValue, valid: true});
  }

  const passwordInputHandler = (event) => {
    const textValue = event.target.value;
    if(textValue === ''){
      setPassword({value: textValue, valid: false});
      return;
    }
      setPassword({value: textValue, valid: true});
    
  }

  const confirmPasswordInputHandler = (event) => {
    const textValue = event.target.value;
    if(textValue === ''){
      setConfirmPassword({value: textValue, valid: false});
      return;
      
    }
    setConfirmPassword({value: textValue, valid: true});
  }

  const emailInputHandler = (event) => {
    const textValue = event.target.value;
    if(textValue === ''){
      setEmail({value: textValue, valid: false, error: true});
      return;
      
    }
    setEmail({value: textValue, valid: true, error: false});
  }

  const submitHandler = event => {
    event.preventDefault();

    if(password.value !== confirmPassword.value){
      console.log(password !== confirmPassword);
      setPassword((prevPass)=> { return {...prevPass, error: true}})
      setConfirmPassword((prevConfPass)=> {return {...prevConfPass, error: true}})

      if(!validateEmail(email.value)){
        setEmail((prevEmail)=> { return {...prevEmail, error: true}})
      }

      return;
    }

    if(!validateEmail(email.value)){
      setEmail((prevEmail)=> { return {...prevEmail, error: true}})
      return;
    }
    props.onAuth(username.value, password.value, email.value);
  };

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  let form = (<div className={classes.paper}>
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign up
    </Typography>
    {props.error == null ? null: <div className={classes.alert}> <Alert severity="error">User Already Exist!</Alert></div>}
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
            onChange={(event) => { usernameInputHandler(event);}}
            value={username.value}
            error={props.error !== null}
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
            onChange={(event) => { emailInputHandler(event);}}
            value={email.value}
            error={props.error !== null || email.error}
            helperText={email.error? "Email is not correct!" : null}
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
            onChange={(event) => { passwordInputHandler(event);}}
            value={password.value}
            error={password.error}
            helperText={password.error? "Password not match!" : null}
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
            onChange={(event) => { confirmPasswordInputHandler(event); }}
            value={confirmPassword.value}
            error={confirmPassword.error}
            helperText={confirmPassword.error? "Password not match!" : null}
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
        disabled={!(username.valid && email.valid && password.valid && confirmPassword.valid)}
      >
        Sign Up
      </Button>
      <Grid container justify="flex-start">
        <Grid item>
          <Link to='/signin' onClick={props.onInit} style={{textDecoration: 'none'}}>
          <Button className={classes.button}>{"Already have an account? Sign in"}</Button>
            
          </Link>
        </Grid>
      </Grid>
    </form>
  </div>);

  if (props.loading) {
    form = (<div className={classes.paper}><CircularProgress /></div>);
  }

  let signinPageRedirect = null;

  if(props.isSignupSuccess){
    signinPageRedirect = <Redirect to='/signin'/>
  }

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
     {signinPageRedirect} 
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
    isAuthenticated: state.auth.token !== null,
    isSignupSuccess: state.auth.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password, email) =>
      dispatch(actions.authSignUp(username, password, email)),
    onInit: ()=>
        dispatch(actions.authInitite())  
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);