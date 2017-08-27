var React = require('react');
var ReactDOM = require('react-dom');

class Label extends React.Component{

   constructor(props) {
      super(props);
      this.props = props;
      
    }

   render(){ 

     console.log('[Label] render');
     
     if(this.props.visible != "false"){
     
      return <div className="row">
                <div className="col-lg-12">
                  <div className="alert alert-info">{this.props.label}</div>
                  </div>
              </div>;
     }
     else{
       return null;
     }
   }
};

module.exports = Label;