import '../styles/button.css';

import React from 'react';

interface ButtonProps {
  action: string;
  bgColor: string;
}

export default function Button({ action, bgColor }: ButtonProps) {
  return (
    <button className="pushable disable">
      <span className="shadow"></span>
      <span className={`edge ${bgColor}`}></span>
      <span className={`front ${bgColor}`}>{action}</span>
    </button>
  );
}
