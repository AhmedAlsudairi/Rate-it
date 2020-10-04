import React, { useState } from 'react';
import {connect} from 'react-redux';
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
import {Link, Redirect } from 'react-router-dom';
import Copyright from '../../../components/Copyright/Copyright';
import * as actions from '../../../store/actions/auth';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    marginTop: 100
  },
  spinner: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  button: {
    color: 'black',

  }
}));


function SignIn(props) {
  const classes = useStyles();
  const [username, setUsername] = useState({value: '', valid: false});
  const [password, setPassword] = useState({value: '', valid: false});

  const usernameInputHandler = (event) => {
    const textValue = event.target.value;
    if(textValue === ''){
      setUsername({value: textValue, valid: false});
      
    }else{
      setUsername({value: textValue, valid: true});
    }
  }

  const passwordInputHandler = (event) => {
    const textValue = event.target.value;
    if(textValue === ''){
      setPassword({value: textValue, valid: false});
    }else{
      setPassword({value: textValue, valid: true});
    }
  }
  

  const submitHandler = event => {
    event.preventDefault();
    props.onAuth(username.value, password.value);
  };


  let form = (<div className={classes.paper}>
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign in
    </Typography>
    {props.error == null ? null: <div className={classes.alert}> <Alert severity="error" >Username or passwor is wrong!</Alert> </div>}
    <form className={classes.form} noValidate>
      <TextField
            autoComplete="username"
            name="username"
            variant="outlined"
            required
            fullWidth
            id="username"
            label="Username"
            margin="normal"
            autoFocus
            onChange={(event)=>{usernameInputHandler(event)}}
            value={username.value}
            error={props.error !== null}
          />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(event)=>{passwordInputHandler(event)}}
        value={password.value}
        error={props.error !== null}
      />
     
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={submitHandler}
        disabled={!(username.valid && password.valid)}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs> 
        <Link to='/signup' onClick={props.onInit} style={{textDecoration: 'none'}} >
            <Button className={classes.button}>
              {"Don't have an account? Sign Up"}
            </Button>
          </Link>
        </Grid>
        <Grid item>

        </Grid>
      </Grid>
    </form>
  </div>);

   let homePageRedirect = null;

   if(props.isAuthenticated){
     homePageRedirect = <Redirect to='/'/>
   }
  if(props.loading){
    form = (<div className={classes.paper}><CircularProgress/></div>);
  }
  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
        {homePageRedirect}
        {form}
      <Box mt={8}>
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
    onAuth: (username, password) =>
      dispatch(actions.authSignIn(username,password)),
    onInit: ()=>
      dispatch(actions.authInitite())  
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
