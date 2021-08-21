import React from 'react';

interface ButtonProps {
  action: string;
  bgColor: string;
}

export default function Button({ action, bgColor }: ButtonProps) {
  return (
    <button
      className={`flex-center w-16 h-16 rounded-lg m-3 text-cullen font-roboto ${bgColor}`}>
      {action}
    </button>
  );
}
