import React from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { useHistory } from "react-router-dom";

import Footer from "../components/Footer";
import { questions } from "../data/questions";

export default function Infos() {
  const history = useHistory();

  const totalQuestions = questions.length;
  const easyQuestions = questions.filter(
    (question) => question.level === "easy"
  ).length;
  const mediumQuestions = questions.filter(
    (question) => question.level === "medium"
  ).length;
  const hardQuestions = questions.filter(
    (question) => question.level === "hard"
  ).length;
  const extremeQuestions = questions.filter(
    (question) => question.level === "extreme"
  ).length;

  const questionA = questions.filter(
    (question) => question.answer === "A"
  ).length;
  const questionB = questions.filter(
    (question) => question.answer === "B"
  ).length;
  const questionC = questions.filter(
    (question) => question.answer === "C"
  ).length;
  const questionD = questions.filter(
    (question) => question.answer === "D"
  ).length;

  return (
    <div className="flex-center flex-col gap-5 bg-paper w-screen h-screen">
      <VscArrowLeft
        className="absolute top-5 left-5 text-indigo-400 w-9 h-9 cursor-pointer"
        onClick={() => history.push("/")}
      />

      <h1 className="text-black text-xl text-center font-acme flex-center">
        Quantidade de perguntas: {totalQuestions}
      </h1>

      <h1 className="text-black text-xl text-center font-acme flex-center">
        Quantidade de perguntas fáceis: {easyQuestions}
      </h1>

      <h1 className="text-black text-xl text-center font-acme flex-center">
        Quantidade de perguntas médias: {mediumQuestions}
      </h1>

      <h1 className="text-black text-xl text-center font-acme flex-center">
        Quantidade de perguntas difíceis: {hardQuestions}
      </h1>

      <h1 className="text-black text-xl text-center font-acme flex-center">
        Quantidade de perguntas extremas: {extremeQuestions}
      </h1>

      <hr />

      <h1 className="text-black text-xl text-center font-acme flex-center">
        Quantidade de perguntas com resposta A: {questionA}
      </h1>

      <h1 className="text-black text-xl text-center font-acme flex-center">
        Quantidade de perguntas com resposta B: {questionB}
      </h1>

      <h1 className="text-black text-xl text-center font-acme flex-center">
        Quantidade de perguntas com resposta C: {questionC}
      </h1>

      <h1 className="text-black text-xl text-center font-acme flex-center">
        Quantidade de perguntas com resposta D: {questionD}
      </h1>
      <Footer />
    </div>
  );
}
