var React = require('react');
var Label = require('./label.react.js');


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
       return  <Label key={item.key} label={item.task} />
      })
    }
    </div>;           
  } 

}

module.exports = TodoList;