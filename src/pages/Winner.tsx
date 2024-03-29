import React, { useContext, useEffect } from "react";
import { VscDebugRestart } from "react-icons/vsc";
import Lottie from "react-lottie";
import { useHistory } from "react-router-dom";

import fireworksAnimationData from "../assets/animations/fireworks.json";
import logoImage from "../assets/logo.png";
import GameContext from "../context/game";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Winner() {
  const history = useHistory();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: fireworksAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [storedValue, setStorageValue] = useLocalStorage({
    defaultValue: [],
    key: "ranking",
  });

  const { state } = useContext(GameContext);

  useEffect(() => {
    if (state.name) {
      setStorageValue([
        ...storedValue,
        {
          name: state.name,
          money: 1000000,
        },
      ]);
    }
  }, []);

  return (
    <div className="flex-center flex-col bg-paper w-screen h-screen">
      <div className="flex-center absolute">
        <Lottie
          options={defaultOptions}
          height={500}
          width={500}
          isStopped={false}
          isPaused={false}
          isClickToPauseDisabled={true}
        />
      </div>
      <VscDebugRestart
        className="absolute top-5 left-5 text-indigo-400 w-9 h-9 cursor-pointer"
        onClick={() => history.push("/ranking")}
      />
      <img src={logoImage} alt="Logo" className="w-96 z-10" />
      <h1 className="text-indigo-400 text-5xl text-center font-acme absolute bottom-10 flex-center">
        Parabéns, você ganhou 1 MILHÃO de pontos!
      </h1>
    </div>
  );
}
