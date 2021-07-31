import React, { useState } from "react";


// eslint-disable-next-line react/prop-types
const BodyPart = ({ children }) => {
  const [isDragging, SetIsDragging] = useState(false);

  return (
    <div
      className={"card draggable" + (isDragging ? " dragging" : "")}
      draggable="true"
      onDragStart={() => {
        SetIsDragging(true);
      }}
      onDragEnd={() => {
        SetIsDragging(false);
      }}
    >
      
        <img className="card-img" src={`/images/placeholder150.png`} alt="placeholder"></img>
        {/* <div className="card-img-overlay"> */}
        {children}
        {/* </div> */}
      
    </div>
  );
};

export default BodyPart;
