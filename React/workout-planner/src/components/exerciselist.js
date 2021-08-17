import React, { useContext } from "react";
import { ExerciseDataContext } from "../config/ExerciseDataContext";
import { FormStateContext } from "../config/FormStateContext";
import { FormState } from "../enums/enums";

const ExerciseList = () => {
  const { setFormState } = useContext(FormStateContext);
  const { selectedExerciseId, setSelectedExerciseId, exerciseList } =
    useContext(ExerciseDataContext);

  return (
    <div className="col-3">
      <ul className="list-group exercise-list">
        {exerciseList.map((element) => {
          return (
            <li
              className={
                "list-group-item" +
                (selectedExerciseId === element.id ? " exercise-selected" : "")
              }
              id={element.id}
              key={element.id}
              onClick={(e) => setSelectedExerciseId(parseInt(e.target.id))}
              onDoubleClick={() => setFormState(FormState.EDIT)}
            >
              {element.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExerciseList;
