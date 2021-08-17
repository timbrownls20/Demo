import React, { useState } from "react";
import { FormState } from "../enums/enums";

export const FormStateContext = React.createContext();

export const FormStateProvider = ({ children }) => {
  const [formState, setFormState] = useState(FormState.UNDEFINED);

  const provider = {
    formState,
    setFormState,
  };

  return (
    <FormStateContext.Provider value={provider}>
      {children}
    </FormStateContext.Provider>
  );
};
