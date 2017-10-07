
import React from 'react';
import JSONPretty from 'react-json-pretty';
import {Col, Row} from 'react-bootstrap'

export default class DebugLabel extends React.Component {
  render() {
    return <Row>
          <Col>
            <JSONPretty id="json-pretty" json={this.props}></JSONPretty>
          </Col>
        </Row>;
   
  }

}