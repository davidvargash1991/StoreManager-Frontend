import React, { Component } from 'react';
import Main from './main/main';
import { BrowserRouter } from 'react-router-dom';
import './css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>      
    );
  }
}

export default App;
