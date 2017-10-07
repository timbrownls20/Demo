
import React from 'react';
import Page1 from './Page1.jsx';
import Page2 from './Page2.jsx';
import InfoLabel from './InfoLabel.jsx';
import DebugLabel from './DebugLabel.jsx';
import { Provider } from 'react-redux';
import configureStore from './redux/redux.store.js';
import { Router, Route } from 'react-router';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return <Provider store={store}> 
        <Page1 />
      </Provider>
  }

}