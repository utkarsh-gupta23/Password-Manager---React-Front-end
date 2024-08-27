import React from "react";
import "./Modal.css";
const AddCredentialModal = ({ children, onClose }) => {
  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <dialog open className="modal">
        {children}
      </dialog>
    </>
  );
};

export default AddCredentialModal;
