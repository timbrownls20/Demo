import React from 'react';
import config from './config';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';

//https://create-react-app.dev/docs/adding-custom-environment-variables/

function App() {
  return (
    <div className="App container p-4">
      <h2>Deployment Demo</h2>
      <h5>Client</h5>
      <div>client env variable: {process.env.REACT_APP_CLIENT_ENV}</div>
      <div>client config: {JSON.stringify(config)}</div>
    </div>
  );
}

export default App;
