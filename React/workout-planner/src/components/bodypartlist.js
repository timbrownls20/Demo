import React from "react";
import { Draggable } from "react-beautiful-dnd";
import BodyPart from "./BodyPart";

const BodyPartList = ({ provided, data, isDraggingOver }) => {
  return (
    <div
      className={
        "col-3 droppable d-flex flex-wrap align-content-start " +
        (isDraggingOver ? "dragover" : "")
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
            {provided => (
              <div>
                <BodyPart text={element.name} provided={provided}></BodyPart>
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
