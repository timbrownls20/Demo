var React = require('react');
var ReactDOM = require('react-dom');
var FullRow = require('./components/fullrow.react.js');

class TodoList extends React.Component{


  //.. life cycle events
  constructor(props) {
    super(props);
    this.props = props;
  }

  

  render(){

    console.log('[TodoList] render');
   
    return <div className="container-fluid">
              <FullRow>
                  <h1>{this.props.label}</h1>
              </FullRow>
            </div>;
           
  } 

};



ReactDOM.render(<TodoList label="TB Test"/>, document.getElementById('react-application'));
