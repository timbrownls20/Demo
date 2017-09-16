var util = require('util')
var React = require('react');
var ReactDOM = require('react-dom');
var TodoList = require('./components/todolist.react.js');
var TodoInsert = require('./components/todoinsert_v1.react.js');
var FullRow = require('./components/fullrow.react.js');
var Label = require('./components/label.react.js');

class Application extends React.Component{


  addTask(input){

    console.log("[Application] addTask input:" + input);


    var newTask = { 
        id: this.state.todoitems.length + 1, 
        task: input
    }
    var todoitems = this.state.todoitems;
    todoitems.push(newTask);
    this.setState({  
      todoitems:todoitems
    });
    

  }

  removeTask(taskId)
  {
      console.log("[Application] removeTask id:" + taskId);

      var todoitems = this.state.todoitems;
      todoitems.map(function(item, index){

       if(item.id == taskId)
       {
          delete todoitems[index];
       }
     });

      this.setState({  
        todoitems:todoitems
      });

  }

  //.. life cycle events
  constructor(props) {
    super(props);
    this.props = props;
    this.state = 
    {
       todoitems :[]
    };

    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }


  render(){

    console.log('[Application] render');
   
    return <div className="container-fluid">
              <FullRow>
                  <h2>{this.props.label}</h2>
              </FullRow>
              <TodoList todoitems={this.state.todoitems} removeTask={this.removeTask} />
              <TodoInsert addTask={this.addTask}/>
              <Label label={JSON.stringify(this.state)} visible="false"/>
            </div>;
           
  } 

};



ReactDOM.render(<Application label="Todo List V1"/>, document.getElementById('react-application'));
