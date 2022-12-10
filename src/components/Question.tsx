import React from "react";

interface QuestionProps {
  alternative: string;
  answer: string;
  selected?: boolean;
  onClick: () => void;
  disabled: boolean;
}

export default function Question({
  alternative,
  answer,
  selected,
  onClick,
  disabled,
}: QuestionProps) {
  function validateQuestion() {
    if (disabled) return;

    onClick();
  }

  return (
    <button
      onClick={validateQuestion}
      className={`flex items-center justify-start w-96 h-11 question bg-indigo-400 hover:opacity-80 duration-500 cursor-pointer my-2 ${
        selected ? "bg-indigo-900" : ""
      } ${disabled ? "bg-warmGray-500 cursor-not-allowed" : null}`}
      disabled={disabled}
      title={disabled ? "Essa resposta foi eliminada pelas cartas" : undefined}
    >
      <h1 className="text-lg font-acme text-cullen mx-5">{alternative}</h1>
      <h1
        className={`${
          answer.length >= 45 ? "text-sm" : "text-lg"
        } font-acme text-cullen text-left pr-2`}
      >
        {answer}
      </h1>
    </button>
  );
}
