import React, { useEffect } from 'react';
import {BrowserRouter} from 'react-router-dom'
import MainContainer from './containers/mainContainer/mainContainer';
import * as actions from './store/actions/auth';
import {connect} from 'react-redux';
function App(props) {
  useEffect(()=>{
    props.onAutoLogin();
  })
  return (
    <BrowserRouter>
    <MainContainer/>
    </BrowserRouter>
  );
}

const mapDispatchToProps = dispatch =>{
  return {
    onAutoLogin: () => dispatch(actions.authCheckState())
  }
}
export default connect(null,mapDispatchToProps)(App);
