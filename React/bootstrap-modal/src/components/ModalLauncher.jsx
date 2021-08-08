import React from "react";

// eslint-disable-next-line react/prop-types
const ModalLauncher = ({ showModal }) => {
  return (
    <div className="card text-center p-5 modal-launch">
      <div className="card-body">
        <div className="card-title">
          <h5>Bootstrap Modal</h5>
        </div>
        <div className="card-text text-left m-3">
          React bootstrap modal demonstration with no JQuery or react bootstrap
          components
        </div>
        <button
          type="button"
          className="btn btn-outline-primary mt-3"
          onClick={showModal}
        >
          Open Modal
        </button>
      </div>
    </div>
  );
};

export default ModalLauncher;
