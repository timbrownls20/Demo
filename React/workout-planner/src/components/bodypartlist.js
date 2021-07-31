import React from "react";
import { Draggable } from "react-beautiful-dnd";
import BodyPart from "./bodypart";

const BodyPartList = ({placeholder, data}) => {
  return (
    <div className="d-flex flex-wrap">
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
      {placeholder}
    </div>
  );
};

export default BodyPartList;
