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
            <div className="row">
              <div className="col-lg-12">
                <Label label={this.state.active} />
              </div>
            </div>
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
     console.log('[Label] render:props: ' + JSON.stringify(this.props));

     return <div className="alert alert-info">{JSON.stringify(this.props)}</div>;
   }
};

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

ReactDOM.render(<Counter label="TB Test 1"/>, document.getElementById('react-application'));
