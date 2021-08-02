import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import BodyPartList from "./bodypartlist";
import { bodyPartData, exerciseData } from "../data/initialData";

const ExerciseList = () => {
  const [exerciseList, setExerciseList] = useState(exerciseData);
  const [selectedExerciseId, setSelectedExerciseId] = useState(
    exerciseData[0].id
  );

  function selectedExercise() {
    return exerciseList.find((e) => e.id === selectedExerciseId);
  }

  function availableBodyPartsForSelection() {
    let exercise = selectedExercise();
    return bodyPartData.filter((e) => {
      return !exercise.bodyParts.find((bp) => bp.id === e.id);
    });
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

  const selectExercise = (e) => {
    setSelectedExerciseId(parseInt(e.target.id));
  };

  return (
    <div className="container-fluid">
      <h1>Workout Planner</h1>
      <hr />

      <div className="row">
        <div className="col-3">
          <ul className="list-group exercise-list">
            {exerciseData.map((element) => {
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
                  onClick={selectExercise}
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
        <hr />
        <code>{JSON.stringify(exerciseList)}</code>
      </div>
    </div>
  );
};

export default ExerciseList;
