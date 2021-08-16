import React, { useState, useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import BodyPartList from "./bodypartList";
import ExerciseAdd from "./exerciseAdd";
import config from "../config/config";
import { FormState } from "../enums/enums";
import { ExerciseDataContext } from "../config/exerciseDataContext";

const ExerciseList = () => {
  const [formState, setFormState] = useState(FormState.Undefined);
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
  } = useContext(ExerciseDataContext);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    if (
      result.source.droppableId === "source" &&
      result.destination.droppableId === "target"
    ) {
      addBodyPart(result.draggableId, selectedExerciseId);
    } else if (
      result.source.droppableId === "target" &&
      result.destination.droppableId === "source"
    ) {
      removeBodyPart(result.draggableId, selectedExerciseId);
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
          addExercise(name);

          setFormState(FormState.Undefined);
        }}
        edit={(id, name) => {
          editExercise(id, name);

          setFormState(FormState.Undefined);
        }}
        remove={() => {
          removeExercise(selectedExerciseId);

          setFormState(FormState.Undefined);
        }}
        exercise={selectedExercise()}
      ></ExerciseAdd>
    </>
  );
};

export default ExerciseList;
