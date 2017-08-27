var React = require('react');
var ReactDOM = require('react-dom');

class DebugLabel extends React.Component{

   constructor(props) {
      super(props);
      this.props = props;
      
    }

   render(){ 

     console.log('[Label] render');
     console.log('[Label] render:props: ' + JSON.stringify(this.props));

     return <div className="row">
              <div className="col-lg-12">
                <div className="alert alert-info">{JSON.stringify(this.props)}</div>
                </div>
            </div>;
   }
};

module.exports = DebugLabel;