var React = require('react');
var ReactDOM = require('react-dom');

class Button extends React.Component{

  constructor(props) {
    super(props);
    this.props = props;
    
  } 

  render() {

      console.log('[Button] render');
      

      return <button onClick={this.props.handleClick}>{this.props.label}</button> 
  }

};

module.exports = Button;