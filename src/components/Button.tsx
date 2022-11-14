import React from "react";

import "../styles/button.css";

interface ButtonProps {
  action: string;
  bgColor: string;
  onClick: () => void;
}

export default function Button({ action, bgColor, onClick }: ButtonProps) {
  return (
    <button className="pushable disable" onClick={onClick}>
      <span className="shadow"></span>
      <span className={`edge ${bgColor}`}></span>
      <span className={`front ${bgColor}`}>{action}</span>
    </button>
  );
}
