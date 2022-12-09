import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { IoPodium } from "react-icons/io5";

import LogoImage from "../assets/logo.png";
import Footer from "../components/Footer";
import GameContext from "../context/game";

export default function Home() {
  const history = useHistory();

  const [name, setName] = useState<string>("");

  const { setState } = useContext(GameContext);

  function handleSubmit() {
    if (!name) {
      toast("Insira seu nome ou de sua equipe");
      return;
    }

    setState({
      name,
      notice: "O jogo irá iniciar, prepare-se!",
      money: 0,
      level: "easy",
      questionsAnswered: [],
      skips: 0,
      helps: {
        audience: true,
        seminarists: true,
        cards: true,
      },
      hiddenQuestions: [],
    });

    history.push("/notice");
  }

  return (
    <div className="flex-center flex-col bg-paper w-screen h-screen">
      <IoPodium
        className="absolute top-5 right-5 text-rose-600 w-11 h-11 cursor-pointer"
        onClick={() => history.push("/ranking")}
        title="Ranking de pontuações"
      />

      <img src={LogoImage} alt="logo" className="w-96" />

      <div className="flex-center mt-10">
        <input
          className="bg-gray-100 appearance-none border-2 border-gray-100 shadow-md rounded-2xl w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          placeholder="Insira seu nome ou de sua equipe"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-center bg-rose-600 text-cullen w-24 py-2 ml-3 font-roboto rounded-lg"
        >
          Jogar
        </button>
      </div>

      <Footer />
    </div>
  );
}
