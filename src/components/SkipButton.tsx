import React from "react";

import SkipImage from "../assets/skip.png";

interface SkipButtonProps {
  disabled: boolean;
  handleSkip: () => void;
}

export const SkipButton: React.FC<SkipButtonProps> = ({
  disabled,
  handleSkip,
}) => {
  return disabled ? (
    <button onClick={handleSkip}>
      <div className="flex-center bg-rose-200 w-20 h-20 rounded-md">
        <img src={SkipImage} alt="skip" className="w-14 h-14" title="Pular" />
      </div>
    </button>
  ) : (
    <button className="cursor-not-allowed">
      <div className="flex-center bg-white w-20 h-20 rounded-md">
        <img
          src={SkipImage}
          alt="skip"
          className="w-14 h-14"
          title="Já utilizado"
        />
      </div>
    </button>
  );
};
