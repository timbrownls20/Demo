import React from "react";
import "./App.css";
import Quote from "./components/Quote";
import { SequentialDataLoader } from "./data/SequentialDataLoader";

const App: React.FC = () => {
  return (
    <div className="App">
        <Quote interval={1000} dataLoader={new SequentialDataLoader()} />
    </div>
  );
};

export default App;
