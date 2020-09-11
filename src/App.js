import React from 'react';
import Courses from './containers/Courses/Courses';
import {BrowserRouter} from 'react-router-dom'
import MainContainer from './containers/mainContainer/mainContainer';
function App() {
  return (
    <BrowserRouter>
    <MainContainer/>
    </BrowserRouter>
  );
}

export default App;
