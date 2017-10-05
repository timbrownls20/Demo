/*
    ./client/components/App.jsx
*/
import React from 'react';
import Page1 from './Page1.jsx';
import {Alert} from 'react-bootstrap'

export default class App extends React.Component {
  render() {
    return <div className="container"> 
      <Page1 />
    </div>
  }

}