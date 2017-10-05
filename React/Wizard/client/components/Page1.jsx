import React from 'react';
//import {Jumbotron, Button, Row, Col} from 'react-bootstrap'
//var {Jumbotron, Button, Row, Col} = require ('react-bootstrap');

var Jumbotron = require ('react-bootstrap').Jumbotron;
var Button = require ('react-bootstrap').Button;
var Row = require ('react-bootstrap').Row;
var Col = require ('react-bootstrap').Col;


export default class Page1 extends React.Component {
  render() {
    return <div>
        <Jumbotron>
            <h1>Page 1 amended 6</h1>
        </Jumbotron>
         <Row>
          <Col lgOffset={1}><Button bsStyle="primary">Click Me</Button></Col>
        </Row>
    </div>;
  }
}