import React, { useState, useReducer } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import BodyPartList from "./bodypartList";
import ExerciseAdd from "./exerciseAdd";
import { bodyPartData, exerciseData } from "../data/initialData";
import config from "../config/config";
import {FormState} from "../enums/enums";
import Action from "../enums/actions";
import exerciseListReducer from "../reducers/exerciseListReducer";

const ExerciseList = () => {
  const [selectedExerciseId, setSelectedExerciseId] = useState(
    exerciseData[0].id
  );

  const [exerciseList, dispatch] = useReducer(
    exerciseListReducer,
    exerciseData
  );
  const [formState, setFormState] = useState(FormState.Undefined);

  const selectedExercise = () =>
    exerciseList.find((e) => e.id === selectedExerciseId);

  function availableBodyPartsForSelection() {
    let exercise = selectedExercise();
    return bodyPartData.filter((e) => {
      return !exercise.bodyParts.find((bp) => bp.id === e.id);
    });
  }

  const onDragEnd = (result) => {
    if (!result.destination) return;

    if (
      result.source.droppableId === "source" &&
      result.destination.droppableId === "target"
    ) {
      console.log("dispatch add");
      dispatch({
        type: Action.ADD_BODYPART,
        value: {
          bodyPartId: result.draggableId,
          exerciseId: selectedExerciseId,
        },
      });
    } else if (
      result.source.droppableId === "target" &&
      result.destination.droppableId === "source"
    ) {
      console.log("dispatch remove");
      dispatch({
        type: Action.REMOVE_BODYPART,
        value: {
          bodyPartId: result.draggableId,
          exerciseId: selectedExerciseId,
        },
      });
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <h3 className="p-2 mt-2">Workout Planner</h3>
          </div>
        </div>
        <hr />

        <div className="row">
          <div className="col-12 d-flex exercises-toolbar">
            <div>
              <FontAwesomeIcon
                icon={faPlusCircle}
                size="2x"
                onClick={() => setFormState(FormState.New)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <ul className="list-group exercise-list">
              {exerciseList.map((element) => {
                return (
                  <li
                    className={
                      "list-group-item" +
                      (selectedExerciseId === element.id
                        ? " exercise-selected"
                        : "")
                    }
                    id={element.id}
                    key={element.id}
                    onClick={(e) =>
                      setSelectedExerciseId(parseInt(e.target.id))
                    }
                    onDoubleClick={() => setFormState(FormState.Edit)}
                  >
                    {element.name}
                  </li>
                );
              })}
            </ul>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="source">
              {(provided, snapshot) => (
                <BodyPartList
                  isDraggingOver={snapshot.isDraggingOver}
                  provided={provided}
                  data={availableBodyPartsForSelection()}
                ></BodyPartList>
              )}
            </Droppable>
            <Droppable droppableId="target">
              {(provided, snapshot) => (
                <BodyPartList
                  isDraggingOver={snapshot.isDraggingOver}
                  provided={provided}
                  data={selectedExercise().bodyParts}
                ></BodyPartList>
              )}
            </Droppable>
          </DragDropContext>
          {config.Debug ? (
            <>
              <hr />
              <code>{JSON.stringify(selectedExercise())}</code>
              <hr />
              <code>{JSON.stringify(exerciseList)}</code>
            </>
          ) : null}
        </div>
      </div>
      <ExerciseAdd
        formState={formState}
        hide={() => setFormState(FormState.Undefined)}
        add={(name) => {
          dispatch({ type: Action.ADD_EXERCISE, value: name });
          setFormState(FormState.Undefined);
        }}
        edit={(id, name) => {
          dispatch({ type: Action.EDIT_EXERCISE, value: { id, name } });
          setFormState(FormState.Undefined);
        }}
        remove={() => {
          dispatch({ type: Action.REMOVE_EXERCISE, value: selectedExerciseId });
          setSelectedExerciseId(exerciseList[0].id);
          setFormState(FormState.Undefined);
        }}
        exercise={selectedExercise()}
      ></ExerciseAdd>
    </>
  );
};

export default ExerciseList;
