import React from "react";
import "./App.css";
import Quote from "./components/Quote";
import BukowskiQuotes from "./data/Bukowski";

const App: React.FC = () => {
  return (
    <div className="App">
        <Quote interval={1000} data={BukowskiQuotes} />
    </div>
  );
};

export default App;
