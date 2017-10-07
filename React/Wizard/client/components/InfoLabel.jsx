
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
      // You can now say this.props.books
      message: state.message
    }
  };
  
//   // Maps actions to props
//   const mapDispatchToProps = (dispatch) => {
//     return {
//     // You can now say this.props.createBook
//       showMessage: message => dispatch(reduxActions.showMessage(message))
//     }
//   };
  
  // Use connect to put them together
  export default connect(mapStateToProps)(InfoLabel);