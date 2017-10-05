import React from 'react';

//.. import variant 1
var Info = require('./Labels.jsx').Info;
var Warning = require('./Labels.jsx').Warning;
var Danger = require('./Labels.jsx').Danger;


//.. import variant 2
//var {Info, Warning, Danger} = require('./Labels.jsx')

//..import variant 3
//import {Info, Warning, Danger} from './Labels.jsx'


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