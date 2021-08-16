import React from "react";
import ExerciseList from "./exerciseList";
import { ExerciseDataProvider } from "../config/exerciseDataContext";

const App = () => {
  return (
    <ExerciseDataProvider>
      <ExerciseList></ExerciseList>
    </ExerciseDataProvider>
  );
};

export default App;
