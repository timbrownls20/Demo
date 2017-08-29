var React = require('react');
var Label = require('./label.react.js');
var FullRow = require('./fullrow.react.js');


class TodoItem extends React.Component{

   constructor(props) {
    super(props);
    this.props = props;
    this.state = 
    {
        important: false
    }
    
    this.removeTask = this.removeTask.bind(this);
    this.toggleImportance = this.toggleImportance.bind(this);
    

  }

  removeTask(){
  
    this.props.removeTask(this.props.id);
  }

  toggleImportance(){
  
     this.setState((prevState) => ({
         important: !prevState.important
     }));
  }
  
  render(){

    console.log('[TodoItem] render');

       var alertClass = this.state.important ? "alert alert-danger" : "alert alert-info"; 

       return <FullRow>
                  <div className={alertClass} >{this.props.task}
                   <span className="glyphicon glyphicon-remove pull-right taskaction" onClick={this.removeTask}></span>
                   <span className="glyphicon glyphicon-alert pull-right taskaction" onClick={this.toggleImportance}></span>
                  </div>
             </FullRow>;
              
  } 

}

module.exports = TodoItem;