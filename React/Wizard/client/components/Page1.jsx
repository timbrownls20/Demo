import React from 'react';
import {Jumbotron, Button, Row, Col} from 'react-bootstrap'

export default class Page1 extends React.Component {
  render() {
    return <div>
        <Jumbotron>
            <h1>Page 1 amended 4</h1>
        </Jumbotron>
         <Row>
          <Col lgOffset={1}><Button bsStyle="primary">Click Me</Button></Col>
        </Row>
    </div>;
  }
}