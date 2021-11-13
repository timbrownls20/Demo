import React, {useState, useEffect} from 'react';
import axios from 'axios'
import config from './config';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {

  const [message, setMessage] = useState('pending');

  useEffect(() => {

    const callServer = async () => {

      try{
        let response: any = await axios.get(config.api);
        setMessage(response.data);
      }
      catch {
        setMessage('unavailable');
      }
    }
    callServer();
  }, []);

  return (
    <div className="App container p-4">
      <h2>Deployment Demo</h2>
      <h5 className="mt-4">Client</h5>
      <div>client env variable: {process.env.REACT_APP_CLIENT_ENV}</div>
      <div>client config: {JSON.stringify(config)}</div>
      <h5 className="mt-4">Server</h5>
      <div>{message}</div>
    </div>
  );
}

export default App;
