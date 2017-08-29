var React = require('react');
var Label = require('./label.react.js');
var FullRow = require('./fullrow.react.js');


class TodoItem extends React.Component{

   constructor(props) {
    super(props);
    this.props = props;
    this.handleClick = this.handleClick.bind(this);
    
  }

  handleClick(){
  
    this.props.removeTask(this.props.id);
  }

  
  render(){

    console.log('[TodoItem] render');

       return <FullRow>
                  <div className="alert alert-info" >{this.props.task}
                   <span className="glyphicon glyphicon-remove pull-right deletetask" onClick={this.handleClick}></span>
                  </div>
             </FullRow>;
              
  } 

}

module.exports = TodoItem;