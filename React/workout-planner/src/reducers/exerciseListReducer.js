import Action from "../enums/actions";
import { bodyPartData } from "../data/initialData";

const exerciseListReducer = (state, action) => {
  let newExerciseList, newExercise;

  switch (action.type) {
    case Action.ADD_EXERCISE:
      newExerciseList = [
        ...state,
        { id: state.length + 1, name: action.value, bodyParts: [] },
      ];
      return newExerciseList;
    case Action.EDIT_EXERCISE:
      newExerciseList = state.map((element) => {
        return element.id === action.value.id
          ? { ...element, name: action.value.name }
          : element;
      });
      return newExerciseList;
    case Action.REMOVE_EXERCISE:
      newExerciseList = state.filter((element) => {
        return element.id !== action.value ? element : null;
      });
      return newExerciseList;
    case Action.ADD_BODYPART:
      newExercise = { ...state.find((e) => e.id === action.value.exerciseId) };

      var bodyPart = bodyPartData.find(
        (element) => element.id === parseInt(action.value.bodyPartId)
      );

      newExercise.bodyParts.push(bodyPart);
      newExerciseList = state.map((element) =>
        element.id === newExercise.id ? newExercise : element
      );
      return newExerciseList;
    case Action.REMOVE_BODYPART:
      newExercise = { ...state.find((e) => e.id === action.value.exerciseId) };

      newExercise.bodyParts = newExercise.bodyParts.filter(
        (element) => element.id !== parseInt(action.value.bodyPartId)
      );

      newExerciseList = state.map((element) =>
        element.id === newExercise.id ? newExercise : element
      );

      return newExerciseList;
    default:
  }
};

export default exerciseListReducer;
