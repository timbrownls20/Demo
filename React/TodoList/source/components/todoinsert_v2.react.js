var React = require('react');
var ReactDOM = require('react-dom');

class TodoInsert extends React.Component{


  //.. life cycle events
  constructor(props) {
    super(props);
    this.props = props;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
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

  handleSubmit(e){
    e.preventDefault();
    this.props.addTask(this.state.todoText);
  }

   render(){

    console.log('[TodoInsert] render');
   
    return  <form onSubmit={this.handleSubmit}>    
            <fieldset className="form-group">
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
                  <input type="submit" className="btn btn-primary" value="Add Task" />
                </div>
              </div>
            </fieldset>
            </form>;
           
  } 

}

module.exports = TodoInsert;