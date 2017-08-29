var React = require('react');
var ReactDOM = require('react-dom');
var FullRow = require('./fullrow.react.js');

class Label extends React.Component{

   constructor(props) {
      super(props);
      this.props = props;
      
    }

   render(){ 

     console.log('[Label] render');
     
     if(this.props.visible != "false"){
     
      return <FullRow>
                  <div className="alert alert-info">{this.props.label}</div>
             </FullRow>;
     }
     else{
       return null;
     }
   }
};

module.exports = Label;