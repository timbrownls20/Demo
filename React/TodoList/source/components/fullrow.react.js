var React = require('react');


class FullRow extends React.Component{

    constructor(props) {
    super(props);
    this.props = props;

    
  }

  

  render(){

    console.log('[FullRow] render');

    return <div className="row">
                <div className="col-lg-10">
                  {this.props.children}
                </div>
               
              </div>;
           
  } 

}

module.exports = FullRow;