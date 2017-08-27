var React = require('react');
var ReactDOM = require('react-dom');

class Header extends React.Component {

    constructor(props) {
      super(props);
      this.props = props;
      
    }

    render(){ 

        console.log('[Header] render');
        return <h1 className="header">{this.props.label}</h1>;
    }

};

module.exports = Header;