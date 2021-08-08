import React, { useState } from "react";
import Modal from "./Modal";
import ModalLauncher from "./ModalLauncher";
import '../css/modal.css';

function App() {
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  return (
    <div>
      <div className="container-fluid">
      <div className="d-flex justify-content-center align-content-center m-5">
            <div className="p-5 demo-text">
            Call me Ishmael. Some years ago - never mind how long precisely - having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.
            </div>
            <ModalLauncher showModal={showModal} />
            <div className="p-5 demo-text">
            Marley was dead, to begin with. There is no doubt whatever about that. The register of his burial was signed by the clergyman, the clerk, the undertaker, and the chief mourner. 
            </div>
        </div>
        <Modal show={show} hideModal={hideModal}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Modal>
      </div>
    </div>
  );
}

export default App;
