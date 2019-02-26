import React, { Component } from 'react';
import Main from './main/main';
import { ConfigureStore } from './redux/configureStore';
import { Provider } from 'react-redux';
import './css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <Main />
      </Provider>
    );
  }
}

export default App;
