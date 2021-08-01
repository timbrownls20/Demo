import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import BodyPartList from "./bodypartlist";
import { bodyPartData } from "../data/data";

const Exercise = () => {
  const [availableBodyParts, setAvailableBodyParts] = useState(bodyPartData);
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    console.log(JSON.stringify(result));

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

  return (
    <div className="container-fluid">
      <h1>Workout Planner</h1>
      <hr />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row">
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
                  data={selectedBodyParts}>

                  </BodyPartList>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Exercise;
