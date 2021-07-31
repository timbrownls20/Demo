import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import BodyPartList from "./bodypartlist";

const App = () => {
  return (
    <div className="container-fluid">
      <h1>Workout Planner</h1>
      <hr />

      <DragDropContext
        onDragEnd={() => {
          console.log("ondragend");
        }}
      >
        <div className="row">
          <Droppable droppableId="source">
            {(provided) => (
              <div className="col-5 drop" ref={provided.innerRef} {...provided.droppableProps}>
                <BodyPartList>
                  {provided.placeholder}
                </BodyPartList>
              </div>
            )}
          </Droppable>
          <div className="col-5 drag">Drop</div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
