var React = require('react');
var ReactDOM = require('react-dom');

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
        //active:false
      }));
      console.log('state: ' + this.state.active);
  }

  render(){

    console.log('[Counter] render');

    return <div>
            <Header label={this.props.label}/>
            <Button label="Press Here" handleClick={this.handleClick}/>
            <Label label={this.state.active} />
         </div>; 
  } 

};

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

class Label extends React.Component{

   constructor(props) {
      super(props);
      this.props = props;
      
    }

   render(){ 

     console.log('[Label] render');
     return <div className="alert alert-info">{this.props.label}</div>;
   }
};

class Button extends React.Component{

  constructor(props) {
    super(props);
    this.props = props;
    
  } 

  render() {

      console.log('[Button] render');
      //console.log('props: ' + this.props.label)

      return <button onClick={this.props.handleClick}>{this.props.label}</button> 
  }

};

ReactDOM.render(<Counter label="TB Test 1"/>, document.getElementById('react-application'));
