import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Droppable } from "react-beautiful-dnd";
import BodyPartList from "./bodypartList";
import ExerciseAdd from "./exerciseAdd";
import { bodyPartData, exerciseData } from "../data/initialData";
import config from "../config/config";
import { FormState } from "../config/enums";

const ExerciseList = () => {
  const [exerciseList, setExerciseList] = useState(exerciseData);
  const [selectedExerciseId, setSelectedExerciseId] = useState(exerciseData[0].id);
  const [formState, setFormState] = useState(FormState.Undefined);

  const selectedExercise = () =>
    exerciseList.find((e) => e.id === selectedExerciseId);

  function availableBodyPartsForSelection() {
    let exercise = selectedExercise();
    return bodyPartData.filter((e) => {
      return !exercise.bodyParts.find((bp) => bp.id === e.id);
    });
  }

  const addExercise = (name) => {
    let newExerciseList = [...exerciseList, {id: exerciseList.length + 1, name:name, bodyParts:[]}];
    setExerciseList(newExerciseList);
  }

  const editExercise = (id, name) => {
    let exerciseListNew = exerciseList.map(element => {
      return element.id === id ? {...element, name: name } : element;
    })
    setExerciseList(exerciseListNew);
  }

  const removeExercise = () => {
    let exerciseListFiltered = exerciseList.filter(element => {
      return element.id !== selectedExerciseId ? element : null;
    })

    setSelectedExerciseId(exerciseListFiltered[0].id);
    setExerciseList(exerciseListFiltered);
  }

  const onDragEnd = (result) => {
    if (!result.destination) return;

    let exerciseNew = { ...selectedExercise() };

    var bodyPart = bodyPartData.find(
      (element) => element.id === parseInt(result.draggableId)
    );

    if (
      result.source.droppableId === "source" &&
      result.destination.droppableId === "target"
    ) {
      exerciseNew.bodyParts.push(bodyPart);
    } else if (
      result.source.droppableId === "target" &&
      result.destination.droppableId === "source"
    ) {
      exerciseNew.bodyParts = exerciseNew.bodyParts.filter(
        (element) => element.id !== parseInt(result.draggableId)
      );
    }

    let exerciseListNew = exerciseList.map((e) => {
      return e.id === exerciseNew.id ? exerciseNew : e;
    });

    setExerciseList(exerciseListNew);
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
              <FontAwesomeIcon icon={faPlusCircle} size="2x" onClick={() => setFormState(FormState.New)} />
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
                    onClick={(e) => setSelectedExerciseId(parseInt(e.target.id))}
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
              <hr/>
              <code>{JSON.stringify(selectedExercise())}</code>
              <hr />
              <code>{JSON.stringify(exerciseList)}</code>
            </>
          ) : null}
        </div>
      </div>
      <ExerciseAdd formState={formState} hide={() => setFormState(FormState.Undefined)} 
          add={(name) => {
            addExercise(name);
            setFormState(FormState.Undefined);
          }} 
          edit={(id, name) => {
            editExercise(id, name);
            setFormState(FormState.Undefined);
          }} 
          remove={() => {
            removeExercise();
            setFormState(FormState.Undefined);
          }} 
          exercise={selectedExercise()}></ExerciseAdd>
    </>
  );
};

export default ExerciseList;
