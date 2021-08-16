import React from 'react';
import useExerciseData from '../hooks/useExerciseData';

export const ExerciseDataContext = React.createContext();

export const ExerciseDataProvider = ({children}) => {

    const {
        selectedExerciseId,
        setSelectedExerciseId,
        selectedExercise,
        exerciseList,
        addExercise,
        editExercise,
        removeExercise,
        addBodyPart,
        removeBodyPart,
        availableBodyPartsForSelection,
      } = useExerciseData();

      const provider = {
        selectedExerciseId,
        setSelectedExerciseId,
        selectedExercise,
        exerciseList,
        addExercise,
        editExercise,
        removeExercise,
        addBodyPart,
        removeBodyPart,
        availableBodyPartsForSelection,
      };

    return (
        <ExerciseDataContext.Provider value={provider}>{children}</ExerciseDataContext.Provider>
    )

}