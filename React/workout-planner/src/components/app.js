import React from "react";
import ExerciseList from "./ExerciseList";
import { ExerciseDataProvider } from "../config/ExerciseDataContext";

const App = () => {
  return (
    <ExerciseDataProvider>
      <ExerciseList></ExerciseList>
    </ExerciseDataProvider>
  );
};

export default App;
