import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import BodyPartList from "./bodypartlist";
import { bodyPartData } from "../data/data";

const App = () => {

  const[availableBodyParts, setAvailableBodyParts] = useState(bodyPartData);
  const[selectedBodyParts, setSelectedBodyParts] = useState([]);

  const onDragEnd = (result) => {

    if(!result.destination) return;

    console.log(JSON.stringify(result));

    let selectedBodyPartsChanged = [...selectedBodyParts];
    let availableBodyPartsChanged = [...availableBodyParts];

    var bodyPart = bodyPartData.find((element) => element.id == result.draggableId);  

    if(result.source.droppableId === "source" && result.destination.droppableId === "target"){
      selectedBodyPartsChanged.push(bodyPart);
      availableBodyPartsChanged = availableBodyPartsChanged.filter((element) => element.id != result.draggableId ); 
    }
    else if(result.source.droppableId === "target" && result.destination.droppableId === "source"){
      availableBodyPartsChanged.push(bodyPart);
      selectedBodyPartsChanged = selectedBodyPartsChanged.filter((element) => element.id != result.draggableId ); 
    }

    setSelectedBodyParts(selectedBodyPartsChanged);
    setAvailableBodyParts(availableBodyPartsChanged);
   
  }

  return (
    <div className="container-fluid">
      <h1>Workout Planner</h1>
      <hr />

      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div className="row">
          <Droppable droppableId="source">
            {(provided) => (
              <div className="col-5 drop" ref={provided.innerRef} {...provided.droppableProps}>
                <BodyPartList placeholder={provided.placeholder} data={availableBodyParts}></BodyPartList>
              </div>
            )}
          </Droppable>
          <Droppable droppableId="target">
          {(provided) => (
            <div className="col-5 drag" ref={provided.innerRef} {...provided.droppableProps}>
              <BodyPartList placeholder={provided.placeholder} data={selectedBodyParts}></BodyPartList>
            </div>
          )}
          </Droppable>
          
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
