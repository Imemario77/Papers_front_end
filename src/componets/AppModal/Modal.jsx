import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./Modal.css";

function AppModal({ children, close }) {
  return (
    <div className="modal">
      <span
        onClick={close}
        style={{
          position: "absolute",
          top: "2%",
          color: "black",
          right: "5%",
          fontSize: "30px",
        }}
      >
        <AiOutlineClose />
      </span>
      {children}
    </div>
  );
}

export default AppModal;
