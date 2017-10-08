
import React from 'react';
import Page1 from './Page1.jsx';
import Page2 from './Page2.jsx';
import { Provider } from 'react-redux';
import configureStore from './redux/redux.store.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import createBrowserHistory from 'history/createBrowserHistory'

// const newHistory = createBrowserHistory();

const store = configureStore();

export default class App extends React.Component {
  render() {
    return <Provider store={store}> 
          <BrowserRouter>
          <Switch>
            <Route path="/" component={Page1} />
            <Route path="/Page2" component={Page2} />
          </Switch>
          </BrowserRouter>
      </Provider>
  }

}