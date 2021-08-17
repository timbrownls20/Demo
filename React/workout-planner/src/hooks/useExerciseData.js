import { useState, useReducer } from "react";
import { bodyPartData, exerciseData } from "../data/initialData";
import exerciseListReducer from "../reducers/exerciseListReducer";
import Action from "../enums/actions";

const useExerciseData = () => {
  exerciseData.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else if (a.name < b.name) {
      return -1;
    } else {
      return 0;
    }
  });

  const [selectedExerciseId, setSelectedExerciseId] = useState(
    exerciseData[0].id
  );

  const [exerciseList, dispatch] = useReducer(
    exerciseListReducer,
    exerciseData
  );

  const selectedExercise = () =>
    exerciseList.find((e) => e.id === selectedExerciseId);

  const availableBodyPartsForSelection = () => {
    let exercise = selectedExercise();
    return bodyPartData.filter((e) => {
      return !exercise.bodyParts.find((bp) => bp.id === e.id);
    });
  };

  const addExercise = (name) => {
    dispatch({ type: Action.ADD_EXERCISE, value: name });
  };

  const editExercise = (id, name) => {
    dispatch({ type: Action.EDIT_EXERCISE, value: { id, name } });
  };

  const removeExercise = (id) => {
    dispatch({ type: Action.REMOVE_EXERCISE, value: id });
    setSelectedExerciseId(exerciseList[0].id);
  };

  const addBodyPart = (bodyPartId, exerciseId) => {
    dispatch({
      type: Action.ADD_BODYPART,
      value: {
        bodyPartId: bodyPartId,
        exerciseId: exerciseId,
      },
    });
  };

  const removeBodyPart = (bodyPartId, exerciseId) => {
    console.log(`exerciseId ${exerciseId}`);

    dispatch({
      type: Action.REMOVE_BODYPART,
      value: {
        bodyPartId: bodyPartId,
        exerciseId: exerciseId,
      },
    });
  };
  return {
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
};

export default useExerciseData;
