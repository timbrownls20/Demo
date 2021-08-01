/* eslint-disable react/prop-types */
import React from "react";

const BodyPart = ({ provided, text }) => {
  return (
    <div className="card draggable"
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}>
      <div className="card-body">
      {text}
      </div>
    </div>
  );
};

export default BodyPart;
