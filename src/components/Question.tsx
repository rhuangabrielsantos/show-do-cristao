import React from "react";

interface QuestionProps {
  alternative: string;
  answer: string;
  selected?: boolean;
  onClick: () => void;
}

export default function Question({
  alternative,
  answer,
  selected,
  onClick,
}: QuestionProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-items-center w-96 h-11 question bg-indigo-400 hover:opacity-80 duration-500 cursor-pointer my-2 ${
        selected ? "bg-indigo-900" : ""
      }`}
    >
      <h1 className="text-lg font-acme text-cullen mx-5">{alternative}</h1>
      <h1 className="text-lg font-acme text-cullen">{answer}</h1>
    </button>
  );
}
