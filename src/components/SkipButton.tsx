import React from "react";

import SkipImage from "../assets/skip.png";

interface SkipButtonProps {
  disabled: boolean;
  handleSkip: () => void;
  color: "rose" | "purple" | "fuchsia";
}

export const SkipButton: React.FC<SkipButtonProps> = ({
  disabled,
  handleSkip,
  color,
}) => {
  return disabled ? (
    <button onClick={handleSkip}>
      <div className={`flex-center bg-${color}-200 w-20 h-20 rounded-md`}>
        <img src={SkipImage} alt="skip" className="w-14 h-14" title="Pular" />
      </div>
    </button>
  ) : (
    <button className="cursor-not-allowed filter grayscale">
      <div className="flex-center bg-gray-200 w-20 h-20 rounded-md">
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
