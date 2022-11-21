import React, { useState } from "react";

import "../styles/card.css";

interface CardFlipProps {
  value: string;
  onClick: () => void;
  canFlip: boolean;
}

export const CardFlip: React.FC<CardFlipProps> = ({
  value,
  onClick,
  canFlip,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (!canFlip) return;

    setIsFlipped(true);
    onClick();
  };

  return (
    <div className="scene scene--card" onClick={handleClick}>
      <div className={`card ${isFlipped ? "is-flipped" : ""}`}>
        <div className="card__face rounded-md flex-center bg-isaque"></div>
        <div className="card__face card__face--back rounded-md flex-center bg-warmGray-300">
          {isFlipped ? value : null}
        </div>
      </div>
    </div>
  );
};
