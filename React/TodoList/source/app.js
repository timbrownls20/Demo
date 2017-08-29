var util = require('util')
var React = require('react');
var ReactDOM = require('react-dom');
var TodoList = require('./components/todolist.react.js');
var FullRow = require('./components/fullrow.react.js');
var Label = require('./components/label.react.js');
// var $ = require("jquery")(window);


class Application extends React.Component{


  addTask(input){

    //console.log("[Application] addTask e:" + util.inspect(this.refs));
    console.log("[Application] addTask debug:" + input);
    


  }


  //.. life cycle events
  constructor(props) {
    super(props);
    this.props = props;
    this.state = 
    {
       todoitems :{}
    };

    this.addTask = this.addTask.bind(this);
  }

  componentWillMount(){

    console.log('[Application] componentWillMount');

    var demoList = [
                    {key:1, task:"Item1"}, 
                    {key:2, task:"Item2"}
                   ];

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
              <TodoInsert addTask={this.addTask}/>
              <Label label={JSON.stringify(this.state)} visible="false"/>
            </div>;
           
  } 

};


class TodoInsert extends React.Component{


  //.. life cycle events
  constructor(props) {
    super(props);
    this.props = props;
    this.handleClick = this.handleClick.bind(this);
  }

  //handleClick = () => {
  handleClick(){

    //console.log(util.inspect(this.textInput.value));

    this.props.addTask(this.textInput.value);
  }


   render(){

    console.log('[TodoInsert] render');
   
    return  <fieldset className="form-group">
              <div className="row">
                <div className="col-lg-12">
                    <small htmlFor="addItem" className="col-form-label text-muted">Add Task</small>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-10">
                  <input ref={(input) => { this.textInput = input; console.log('inserting ref')}} className="form-control" type="text" defaultValue="New Task" id="newTask"  />
                </div>
                <div className="col-lg-2">
                  <button onClick={this.handleClick} className="btn btn-primary">Add Task</button>
                </div>
              </div>
            </fieldset>;
           
  } 

}

ReactDOM.render(<Application label="TODO"/>, document.getElementById('react-application'));
