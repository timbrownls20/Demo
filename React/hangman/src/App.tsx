import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./App.css";
import Word from "./components/Word";

function App(): JSX.Element {
  return (
    <div className="App container">
      <h3>Hangman</h3>
      <Word />
    </div>
  );
}

export default App;
