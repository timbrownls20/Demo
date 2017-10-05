import React from 'react';

var Info = class extends React.Component {
  render() {
    return <div className="alert alert-info">Info</div>;
  }
}

var Warning = class extends React.Component {
  render() {
    return <div className="alert alert-warning">Warning</div>;
  }
}

var Danger = class extends React.Component {
  render() {
    return <div className="alert alert-danger">Danger</div>;;
  }
}

module.exports = {
    Info: Info,
    Warning: Warning,
    Danger: Danger
}