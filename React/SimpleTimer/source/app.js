var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./components/header.react.js');
var Button = require('./components/button.react.js');
var DebugLabel = require('./components/debugLabel.react.js');

class Counter extends React.Component{

  constructor(props) {
    super(props);
    this.props = props;
    this.state = { active:true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (){
      
      this.setState((prevState) =>
      ({
        active: !prevState.active
      }));
      console.log('state: ' + this.state.active);
  }

  render(){

    console.log(' \n\r[Counter] render');

    return <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <Header label={this.props.label}/>
                </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <Button label="Press Here" handleClick={this.handleClick}/>
              </div>
            </div>
            <DebugLabel label={this.state.active} />             
          </div>; 
  } 

};

ReactDOM.render(<Counter label="Simple Timer"/>, document.getElementById('react-application'));
