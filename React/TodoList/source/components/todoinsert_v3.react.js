var React = require('react');
var ReactDOM = require('react-dom');

class TodoInsert extends React.Component{


  //.. life cycle events
  constructor(props) {
    super(props);
    this.props = props;
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  
    this.state = 
    {
      todoText :"New Task"
    };
  }

  handleChange(e){

    this.setState({  
      todoText: e.target.value
    });

  }

  handleClick(){
    this.props.addTask();
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
                  <input onChange={this.handleChange} className="form-control" type="text" value={this.state.todoText} id="newTask"  />
                </div>
                <div className="col-lg-2">
                  <button onClick={this.handleClick} className="btn btn-primary">Add Task</button>
                </div>
              </div>
            </fieldset>;
           
  } 

}

module.exports = TodoInsert;