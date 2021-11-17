import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./App.css";
import SpellingList from "./components/SpellingList";

function App(): JSX.Element {
  return (
    <div className="App container">
      <h3 className="pt-4">Spellings</h3>
      <SpellingList />
    </div>
  );
}

export default App;
