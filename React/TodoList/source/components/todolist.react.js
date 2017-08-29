var React = require('react');
var Label = require('./label.react.js');
var TodoItem = require('./todoitem.react.js');


class TodoList extends React.Component{

   constructor(props) {
    super(props);
    this.props = props;
    
  }

  

  render(){

    console.log('[TodoList] render item: ' + JSON.stringify(this.props.todoitems));
    var handleClick = this.props.removeTask;

    return <div>
    {
     
      this.props.todoitems.map(function(item, index){
       return <TodoItem key={item.id} id={item.id} task={item.task} removeTask={handleClick} />
      })
    }
    </div>;           
  } 

}

module.exports = TodoList;