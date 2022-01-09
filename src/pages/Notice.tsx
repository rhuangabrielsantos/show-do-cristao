import React, { useContext, useEffect } from 'react';
import Lottie from 'react-lottie';
import { useHistory } from 'react-router-dom';

import loadingAnimationData from '../assets/animations/loading.json';
import thinkingAnimationData from '../assets/animations/thinking.json';
import Footer from '../components/Footer';
import UserContext from '../context/user';

export default function Home() {
  const history = useHistory();
  const { state } = useContext(UserContext);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: thinkingAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  function handleGame() {
    history.push('/game');
  }

  useEffect(() => {
    if (!state.name) {
      history.push('/');
    }

    setTimeout(() => {
      handleGame();
    }, 5000);
  }, []);

  return (
    <div className="flex-center flex-col bg-paper w-screen h-screen">
      <div className="flex-center flex-col">
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
          isStopped={false}
          isPaused={false}
          isClickToPauseDisabled={false}
        />
        <div className="flex-center">
          <Lottie
            options={loadingOptions}
            height={100}
            width={100}
            isStopped={false}
            isPaused={false}
            isClickToPauseDisabled={false}
          />
          <h1 className="text-warmGray-800 text-3xl text-center font-acme uppercase">
            {state.notice}
          </h1>
        </div>
      </div>

      <Footer />
    </div>
  );
}
