import React from "react";
import BodyPart from "./bodypart";
import { bodyPartData } from "../../public/data/data";

const App = () => {
  return (
    <div className="container-fluid">
      <h1>Workout Planner</h1>
      <hr />
      <div className="row">
        <div className="d-flex flex-wrap col-5 drop">
          {
            bodyPartData.map((element) => {
              return (
                <BodyPart key={element.id}>
                  {element.name}
              </BodyPart>
              )
            })
          }
          
        </div>
        <div className="col-5 drag">Drop</div>
      </div>
    </div>
  );
};

export default App;
