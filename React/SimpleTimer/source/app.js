var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./components/header.react.js');
var Button = require('./components/button.react.js');
var Label = require('./components/label.react.js');

class Counter extends React.Component{


  toggleCounter (){
      
      this.setState((prevState) =>
      ({
        active: !prevState.active
      }));

  }

  resetCounter (){
      
      this.setState((prevState) =>
      ({
        active: false,
        counter: 0
      }));

  }

  doCount() {

    if(this.state.active){
    
    this.setState((prevState) =>
      ({
        counter: prevState.counter + 1
      }));
    }

  }

  //.. life cycle events
  constructor(props) {

    console.log('\n\r[Counter] constructor');

    super(props);
    this.props = props;
    this.state = { 
      active:false,
      counter:0 
    };
    this.toggleCounter = this.toggleCounter.bind(this);
    this.doCount = this.doCount.bind(this);
    this.resetCounter = this.resetCounter.bind(this);
  }

  componentDidMount() {

     console.log('[Counter] componentDidMount');
     setInterval(this.doCount, 1000);

  }

  render(){

    console.log('[Counter] render');

    var buttonLabel = this.state.active ? "Stop" : "Start";

    return <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <Header label={this.props.label}/>
                </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <Button label={buttonLabel} handleClick={this.toggleCounter}/>
                <Button label="Reset" handleClick={this.resetCounter}/>
              </div>
            </div>
            <Label label={this.state.counter} /> 
            <Label label={JSON.stringify(this.state)} visible="true" />             
          </div>; 
  } 

};

ReactDOM.render(<Counter label="Simple Timer"/>, document.getElementById('react-application'));
