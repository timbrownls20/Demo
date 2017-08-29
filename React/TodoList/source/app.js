var React = require('react');
var ReactDOM = require('react-dom');
var FullRow = require('./components/fullrow.react.js');
var Label = require('./components/label.react.js');

class Application extends React.Component{


  //.. life cycle events
  constructor(props) {
    super(props);
    this.props = props;
    this.state = 
    {
       todoitems :{}
    };
  }

  componentWillMount(){

    console.log('[Application] componentWillMount');

    var demoList = ["Item1", "Item2"];

    this.setState({
      todoitems: demoList
    });
    
  }

  render(){

    console.log('[Application] render');
   
    return <div className="container-fluid">
              <FullRow>
                  <h1>{this.props.label}</h1>
              </FullRow>
              <TodoList todoitems={this.state.todoitems} />
              <Label label={JSON.stringify(this.state)} visible="false"/>
            </div>;
           
  } 

};


class TodoList extends React.Component{

   constructor(props) {
    super(props);
    this.props = props;
    
  }

  

  render(){

    console.log('[TodoList] render');

    return <div>
    {
      this.props.todoitems.map(function(item, index){
       return  <Label label={item} />
      })
    }
    </div>;

   

           
  } 

}


ReactDOM.render(<Application label="TODO"/>, document.getElementById('react-application'));
