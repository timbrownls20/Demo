import React, {useState} from "react";

const ExerciseAdd = ({ show, hide, add }) => {

  const [name, setName] = useState("");

  return (
    <div
      className={"modal" + (show ? " modal-show" : "")}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Exercise</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={hide}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
            <div className="form-text text-muted mb-2">Name</div>
            <input type="text" className="form-control" placeholder="enter exercise name" required onChange={e => setName(e.target.value)} value={name}></input>
            </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={e => {
              //console.log(inspect(e)); 
              add(name);
              setName('');
            }}>
              Add
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={hide}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseAdd;
