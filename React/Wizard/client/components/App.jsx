
import React from 'react';
import Page1 from './Page1.jsx';
import InfoLabel from './InfoLabel.jsx';
import DebugLabel from './DebugLabel.jsx';
import { Provider } from 'react-redux';
import configureStore from './redux/redux.store.js';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return <Provider store={store}> 
      <div className="container"> 
        <InfoLabel />
        <Page1 />
        <DebugLabel/>
      </div>
      </Provider>
  }

}