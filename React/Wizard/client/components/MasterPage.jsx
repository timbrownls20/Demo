
import React from 'react';
import InfoLabel from './InfoLabel.jsx';
import DebugLabel from './DebugLabel.jsx';

export default class MasterPage extends React.Component {
  render() {
    return <div className="container"> 
        <InfoLabel />
        {this.props.children}
        <DebugLabel/>
      </div>;
  }

}