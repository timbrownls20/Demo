import React from "react";
import { Draggable } from "react-beautiful-dnd";
import BodyPart from "./bodypart";
import { bodyPartData } from "../data/data";

const BodyPartList = () => {
  return (
    <div className="d-flex flex-wrap">
      {bodyPartData.map((element, index) => {
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
    </div>
  );
};

export default BodyPartList;
