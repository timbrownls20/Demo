import React from 'react';
import {Info, Warning, Danger} from './Labels.jsx'


export default class Page1 extends React.Component {
  render() {
    return <div>
        <div className="jumbotron">
            <h1>What's up</h1>
        </div>
         <Info />
         <Warning />
         <Danger />
    </div>;
  }
}