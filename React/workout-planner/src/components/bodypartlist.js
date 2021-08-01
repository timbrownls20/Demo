import React from "react";
import { Draggable } from "react-beautiful-dnd";
import BodyPart from "./bodypart";

const BodyPartList = ({ provided, data, isDraggingOver }) => {
  return (
    <div
      className={
        "col-5 droppable d-flex flex-wrap " + (isDraggingOver ? "dragover" : "")
      }
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
      {data.map((element, index) => {
        return (
          <Draggable
            draggableId={element.id.toString()}
            key={element.id}
            index={index}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <BodyPart text={element.name}></BodyPart>
              </div>
            )}
          </Draggable>
        );
      })}
      {provided.placeholder}
    </div>
  );
};

export default BodyPartList;
