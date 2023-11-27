import React from "react";

import "./ButtonAndLabel.css";

function ButtonAndLabel({
  label,
  button1,
  button2,
  open1,
  open2,
  color1,
  color2,
}) {
  return (
    <div className="button-label">
      <span>{label}</span>
      <div>
        {button1 && (
          <button style={{ color: color1 }} onClick={open1}>
            {button1}
          </button>
        )}
        {button2 && (
          <button style={{ color: color2 }} onClick={open2}>
            {button2}
          </button>
        )}
      </div>
    </div>
  );
}

export default ButtonAndLabel;
