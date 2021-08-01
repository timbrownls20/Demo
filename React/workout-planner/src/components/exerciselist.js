import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import BodyPartList from "./bodypartlist";
import { bodyPartData, exerciseData } from "../data/initialData";
import { inspect } from 'util'

const ExerciseList = () => {
  const [exercise, setExercise] = useState(exerciseData[0]);
  const [availableBodyParts, setAvailableBodyParts] = useState(bodyPartData);
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    let selectedBodyPartsChanged = [...selectedBodyParts];
    let availableBodyPartsChanged = [...availableBodyParts];

    var bodyPart = bodyPartData.find(
      (element) => element.id === parseInt(result.draggableId)
    );

    if (
      result.source.droppableId === "source" &&
      result.destination.droppableId === "target"
    ) {
      selectedBodyPartsChanged.push(bodyPart);
      availableBodyPartsChanged = availableBodyPartsChanged.filter(
        (element) => element.id !== parseInt(result.draggableId)
      );
    } else if (
      result.source.droppableId === "target" &&
      result.destination.droppableId === "source"
    ) {
      availableBodyPartsChanged.push(bodyPart);
      selectedBodyPartsChanged = selectedBodyPartsChanged.filter(
        (element) => element.id !== parseInt(result.draggableId)
      );
    }

    setSelectedBodyParts(selectedBodyPartsChanged);
    setAvailableBodyParts(availableBodyPartsChanged);
  };

  const selectExercise = (e) => {

    let selectedExercise = exerciseData.find((element) => element.id === parseInt(e.target.id));
    setExercise(selectedExercise);

    console.log(inspect(selectedExercise));
    setSelectedBodyParts(selectedExercise.bodyParts)
    setAvailableBodyParts(bodyPartData)

  }

  return (
    <div className="container-fluid">
      <h1>Workout Planner</h1>
      <hr />

      <div className="row">
        <div className="col-4">
          <ul className="list-group exercise-list">
            {exerciseData.map((element) => {
              return (
                <li className={"list-group-item" + (exercise.id === element.id ? " exercise-selected" : "")} id={element.id} key={element.id} onClick={selectExercise}>
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
                data={availableBodyParts}
              ></BodyPartList>
            )}
          </Droppable>
          <Droppable droppableId="target">
            {(provided, snapshot) => (
              <BodyPartList
                isDraggingOver={snapshot.isDraggingOver}
                provided={provided}
                data={selectedBodyParts}
              ></BodyPartList>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ExerciseList;
