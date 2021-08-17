import React, { useState, useEffect, useContext } from "react";
import { FormState } from "../enums/enums";
import { FormStateContext } from "../config/FormStateContext";
import { ExerciseDataContext } from "../config/ExerciseDataContext";

const ExerciseForm = () => {
  const { formState, setFormState } = useContext(FormStateContext);
  const {
    selectedExerciseId,
    selectedExercise,
    addExercise,
    editExercise,
    removeExercise,
  } = useContext(ExerciseDataContext);

  const exercise = selectedExercise();
  const [name, setName] = useState(FormState.Edit ? exercise.name : "");

  const hide = () => {
    setFormState(FormState.Undefined);
  };

  const add = (name) => {
    addExercise(name);
    setFormState(FormState.Undefined);
  };

  const edit = (id, name) => {
    editExercise(id, name);
    setFormState(FormState.Undefined);
  };

  const remove = () => {
    removeExercise(selectedExerciseId);
    setFormState(FormState.Undefined);
  };

  useEffect(() => {
    if (formState === FormState.New) {
      setName("");
    } else {
      setName(exercise.name);
    }
  }, [exercise, formState]);

  const save = () => {
    if (formState === FormState.New && exercise) {
      add(name);
      setName("");
    } else if (formState === FormState.Edit && exercise) {
      edit(exercise.id, name);
      setName("");
    }
  };

  return (
    <div
      className={
        "modal" + (formState !== FormState.Undefined ? " modal-show" : "")
      }
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {formState === FormState.New ? "Add Exercise" : "Edit Exercise"}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={hide}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <div className="form-text text-muted mb-2">Name</div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter exercise name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                ></input>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={save}>
              {formState === FormState.New ? "Add" : "Save"}
            </button>
            {formState === FormState.Edit ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={remove}
              >
                Delete
              </button>
            ) : null}
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={hide}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseForm;
