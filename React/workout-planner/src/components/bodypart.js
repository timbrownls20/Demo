/* eslint-disable react/prop-types */
import React from "react";

const BodyPart = ({ text }) => {
  return (

          <div className="card draggable" >
            <img
              className="card-img"
              src={`/images/placeholder150.png`}
              alt="placeholder"
            ></img>
            {text}
          </div>
  );
};

export default BodyPart;
