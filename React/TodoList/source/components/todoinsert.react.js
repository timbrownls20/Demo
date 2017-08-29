var React = require('react');
var ReactDOM = require('react-dom');

class TodoInsert extends React.Component{


  //.. life cycle events
  constructor(props) {
    super(props);
    this.props = props;
    this.handleClick = this.handleClick.bind(this);
  }

  //handleClick = () => {
  handleClick(){

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
                  <input ref={input =>  this.textInput = input} className="form-control" type="text" defaultValue="New Task" id="newTask"  />
                </div>
                <div className="col-lg-2">
                  <button onClick={this.handleClick} className="btn btn-primary">Add Task</button>
                </div>
              </div>
            </fieldset>;
           
  } 

}

module.exports = TodoInsert;