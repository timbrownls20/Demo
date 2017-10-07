
import React from 'react';
import {Alert} from 'react-bootstrap'
import { connect } from 'react-redux';

var InfoLabel = class extends React.Component {
  render() {
    return <Alert bsStyle="danger">
        {this.props.message}
    </Alert>;
   
  }

}

const mapStateToProps = (state, ownProps) => {

    return {
         message: state.message
    }
  };
  
 
  export default connect(mapStateToProps)(InfoLabel);