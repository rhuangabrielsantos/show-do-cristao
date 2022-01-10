import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import LogoImage from '../assets/logo.png';
import Footer from '../components/Footer';
import GameContext from '../context/game';

export default function Home() {
  const history = useHistory();

  const [name, setName] = useState<string>('');

  const { setState } = useContext(GameContext);

  function handleSubmit() {
    setState({
      name,
      notice: 'O jogo irá iniciar, prepare-se!',
      money: 1000,
      level: 'easy',
      questionsAnswered: [],
    });

    history.push('/notice');
  }

  return (
    <div className="flex-center flex-col bg-paper w-screen h-screen">
      <img src={LogoImage} alt="logo" className="w-96" />

      <div className="flex-center mt-10">
        <input
          className="bg-gray-100 appearance-none border-2 border-gray-100 shadow-md rounded-2xl w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          placeholder="Insira seu nome"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-center bg-rose-600 text-cullen w-24 py-2 ml-3 font-roboto rounded-lg">
          Jogar
        </button>
      </div>

      <Footer />
    </div>
  );
}
