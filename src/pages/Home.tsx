import React from 'react';
import { Link } from 'react-router-dom';

import LogoImage from '../assets/logo.png';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="flex-center flex-col bg-paper w-screen h-screen">
      <img src={LogoImage} alt="logo" className="w-96" />

      <div className="flex-center mt-10">
        <input
          className="bg-gray-100 appearance-none border-2 border-gray-100 shadow-md rounded-2xl w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          placeholder="Insira seu nome"
          type="text"
          value=""
        />
        <Link
          to="/game"
          className="flex-center bg-rose-600 text-cullen w-24 py-2 ml-3 font-roboto rounded-lg">
          Jogar
        </Link>
      </div>

      <Footer />
    </div>
  );
}
