import React, { Component } from 'react';
import Main from './main/main';
import { BrowserRouter } from 'react-router-dom';
import './css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import { ConfigureStore } from './redux/configureStore';
import { Provider } from 'react-redux';

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <BrowserRouter>
          <Main />
        </BrowserRouter>      
      </Provider>
    );
  }
}

export default App;
