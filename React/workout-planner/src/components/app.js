import React from "react";
import ExerciseList from "./ExerciseManager";
import { ExerciseDataProvider } from "../config/ExerciseDataContext";
import { FormStateProvider } from "../config/FormStateContext";

const App = () => {
  return (
    <ExerciseDataProvider>
      <FormStateProvider>
      <ExerciseList></ExerciseList>
      </FormStateProvider>
    </ExerciseDataProvider>
  );
};

export default App;
