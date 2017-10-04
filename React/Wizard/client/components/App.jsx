/*
    ./client/components/App.jsx
*/
import React from 'react';
import Page1 from './Page1.jsx';
import {Alert} from 'react-bootstrap'

export default class App extends React.Component {
  render() {
    return <div className="container"> 
       <Alert bsStyle="danger">
        <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
    </Alert>
    <Page1 />
    </div>
  }

}