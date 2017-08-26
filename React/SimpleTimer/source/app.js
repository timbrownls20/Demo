var React = require('react');
var ReactDOM = require('react-dom');

// example 1
// var reactElement = <h1 className="header">
//                      This is a JSX element
//                    </h1>;

//.. example 2
// var Header = React.createClass({

//   handleClick:function(){
//     alert('button clicked');
//   },

//   render:function(){

//     var header = <h1 className="header">
//                      This is a JSX element
//                    </h1>;

//     var button = <button onClick={this.handleClick}>Click Me</button> 

//     return React.createElement('div', null, [header, button]);

//   }

// });

//.. example three
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
      alert('state: ' + this.state.active);
  }

  render(){
    return <div>
            <Header label={this.props.label}/>
            <Button label="Press Here" handleClick={this.handleClick}/>
            <Label label={this.state.active} />
         </div>; 
  } 

};

function Header(props){

    return <h1 className="header">{props.label}</h1>;

}

function Label(props){
   return <div className="alert alert-info">{props.label}</div>;
}

class Button extends React.Component{

 constructor(props) {
  super(props);
  this.props = props;
  
}
 
  

  render() {
    return <button onClick={this.props.handleClick}>{this.props.label}</button> 
  }

}


//var reactComponentElement = React.createElement(Header);

ReactDOM.render(<Counter label="TB Test 1"/>, document.getElementById('react-application'));
