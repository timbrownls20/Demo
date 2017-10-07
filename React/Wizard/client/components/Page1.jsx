import React from 'react';
import { connect } from 'react-redux';
import {Jumbotron, Button, Row, Col} from 'react-bootstrap'
import * as reduxActions from './redux/actions.redux.js';

var Page1 = class extends React.Component {

  showMessage(message){
    this.props.showMessage(message);
  }


  render() {
    return <div>
        <Jumbotron>
            <h1>Demo Page</h1>
        </Jumbotron>
         <Row>
          <Col lgOffset={1}>
            <Button bsStyle="primary" onClick={() => this.showMessage('Danger, danger: high voltage')}>Panic</Button>
            <Button bsStyle="primary" onClick={() => this.showMessage('Calm down, calm down')}>No Panic</Button>
          </Col>
        </Row>
    </div>;
  }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    // You can now say this.props.books
    message: state.message
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  // You can now say this.props.createBook
    showMessage: message => dispatch(reduxActions.showMessage(message))
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(Page1);