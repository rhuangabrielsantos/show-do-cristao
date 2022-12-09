import React, { useContext, useEffect, useState } from "react";
import Lottie from "react-lottie";
import { useHistory } from "react-router-dom";

import timerAnimationData from "../assets/animations/timer.json";
import Audience from "../assets/audience.png";
import CardsImage from "../assets/cards.png";
import CollegeStudentsImage from "../assets/college-students.png";
import LogoImg from "../assets/logo.png";
import AudienceHelpModal from "../components/AudienceHelpModal";
import Button from "../components/Button";
import CardsHelp from "../components/CardsHelp";
import CorrectAnswerModal from "../components/CorrectAnswerModal";
import GameOverModal from "../components/GameOverModal";
import GiveUpModal from "../components/GiveUpModal";
import MoneyLevel from "../components/MoneyLevel";
import Question from "../components/Question";
import Reward from "../components/Reward";
import SeminaristHelpModal from "../components/SeminaristHelpModal";
import { SkipButton } from "../components/SkipButton";
import SkipModal from "../components/SkipModal";
import TimeoutModal from "../components/TimeoutModal";
import GameContext from "../context/game";
import { moneyLevels } from "../data/moneyLevels";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Question as QuestionInterface } from "../interfaces/Question";
import { getQuestion, handleNextMoney } from "../services/GameService";

export default function Game() {
  const history = useHistory();
  const { state, setState } = useContext(GameContext);

  const [timeOut, setTimeOut] = useState(false);
  const [correctAnswerState, setCorrectAnswerState] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [giveUp, setGiveUp] = useState(false);
  const [skipState, setSkipState] = useState(false);
  const [audienceHelp, setAudienceHelp] = useState(false);
  const [seminaristsHelp, setSeminaristsHelp] = useState(false);
  const [cardsHelp, setCardsHelp] = useState(false);

  const [timer, setTimer] = useState(60);
  const [question, setQuestions] = useState<QuestionInterface | null>(null);
  const [A, setA] = useState(false);
  const [B, setB] = useState(false);
  const [C, setC] = useState(false);
  const [D, setD] = useState(false);

  const [errorMoney, setErrorMoney] = useState("");
  const [stopMoney, setStopMoney] = useState("");
  const [winMoney, setWinMoney] = useState("");

  const [storedValue, setValue] = useLocalStorage({
    defaultValue: [],
    key: "ranking",
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: timerAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  function handleAlternative(alternative: string) {
    switch (alternative) {
      case "A":
        setA(true);
        setB(false);
        setC(false);
        setD(false);
        break;
      case "B":
        setA(false);
        setB(true);
        setC(false);
        setD(false);
        break;
      case "C":
        setA(false);
        setB(false);
        setC(true);
        setD(false);
        break;
      case "D":
        setA(false);
        setB(false);
        setC(false);
        setD(true);
        break;
      default:
        break;
    }
  }

  function handleAnswer() {
    const correctAnswer = question?.answer;
    const response = handleCorrectAnswer(correctAnswer);

    if (response === "correct") {
      handleNextQuestion();
      return;
    }

    handleEndGame();
  }

  function handleCorrectAnswer(correctAnswer: string | undefined) {
    switch (correctAnswer) {
      case "A":
        return A ? "correct" : "wrong";
      case "B":
        return B ? "correct" : "wrong";
      case "C":
        return C ? "correct" : "wrong";
      case "D":
        return D ? "correct" : "wrong";
      default:
        return "wrong";
    }
  }

  function handleNextQuestion() {
    const nextMoney = handleNextMoney(state.money);
    const nextNextMoney = handleNextMoney(nextMoney?.amount);

    if (!nextNextMoney) {
      history.push("/winner");
      return;
    }

    setState({
      ...state,
      questionsAnswered: [question?.id || 0, ...state.questionsAnswered],
      notice: `Vamos para próxima pergunta valendo ${nextNextMoney?.money} pontos!`,
      money: nextMoney?.amount || 0,
      level: nextMoney?.level || "easy",
    });
    setCorrectAnswerState(true);
  }

  function handleEndGame() {
    setGameOver(true);

    const userMoney = state.money;
    const userMoneyIndex = moneyLevels.findIndex(
      (money) => money.amount === userMoney
    );
    const errorAmount = moneyLevels[userMoneyIndex + 1]?.amount;

    setState({
      ...state,
      moneyEarned: errorMoney,
    });

    setValue([
      ...storedValue,
      {
        name: state.name,
        money: errorAmount,
      },
    ]);
  }

  function handleGiveUp() {
    setGiveUp(true);

    const userMoney = state.money;
    const userMoneyIndex = moneyLevels.findIndex(
      (money) => money.amount === userMoney
    );
    const stopAmount = moneyLevels[userMoneyIndex]?.amount;

    setState({
      ...state,
      moneyEarned: stopMoney,
    });

    setValue([
      ...storedValue,
      {
        name: state.name,
        money: stopAmount,
      },
    ]);
  }

  function handleMoneys() {
    const userMoney = state.money;
    const userMoneyIndex = moneyLevels.findIndex(
      (money) => money.amount === userMoney
    );

    setStopMoney(moneyLevels[userMoneyIndex]?.money);

    const errorMoney = moneyLevels[userMoneyIndex + 1]?.money;
    setErrorMoney(errorMoney || "0");

    const winMoney = moneyLevels[userMoneyIndex - 1]?.money;
    setWinMoney(winMoney);
  }

  function handleSkip() {
    if (state.skips === 3) return;

    setGameOver(true);

    const formattedMoney = moneyLevels.find(
      (money) => money.amount === state.money
    )?.money;

    setState({
      ...state,
      questionsAnswered: [question?.id || 0, ...state.questionsAnswered],
      notice: `Vamos para uma nova pergunta valendo ${formattedMoney} pontos!`,
      skips: state.skips + 1,
    });

    setSkipState(true);
  }

  function handleAudienceHelp() {
    if (!state.helps.audience) return;

    setAudienceHelp(true);
    setTimer(30);

    setState({
      ...state,
      helps: {
        ...state.helps,
        audience: false,
      },
    });
  }

  function handleSeminaristsHelp() {
    if (!state.helps.seminarists) return;

    setSeminaristsHelp(true);
    setTimer(30);

    setState({
      ...state,
      helps: {
        ...state.helps,
        seminarists: false,
      },
    });
  }

  function handleCardsHelp() {
    if (!state.helps.cards) return;

    setCardsHelp(true);
    setTimer(30);

    setState({
      ...state,
      helps: {
        ...state.helps,
        cards: false,
      },
    });
  }

  useEffect(() => {
    try {
      setQuestions(getQuestion(state.level, state.questionsAnswered));
    } catch (error) {
      history.push("/");
    }

    handleMoneys();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        timer > 0 &&
        !correctAnswerState &&
        !gameOver &&
        !giveUp &&
        !audienceHelp &&
        !cardsHelp &&
        !seminaristsHelp
      ) {
        setTimer(timer - 1);
      } else if (
        !correctAnswerState &&
        !gameOver &&
        !giveUp &&
        !audienceHelp &&
        !cardsHelp &&
        !seminaristsHelp
      ) {
        setTimeOut(true);
        setState({
          ...state,
          moneyEarned: errorMoney,
        });
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer, audienceHelp, cardsHelp, seminaristsHelp]);

  return (
    <>
      <div className="flex-center bg-paper w-screen h-screen">
        <div>
          <section className="flex-center">
            <img src={LogoImg} alt="logo" className="w-72 mr-7" />
            <div className="flex-center flex-col w-96 h-36 bg-indigo-400 rounded-md">
              <h1 className="text-cullen text-xl text-center font-acme uppercase px-4">
                {question?.question}
              </h1>
            </div>
          </section>
          <section className="flex-center mt-5">
            <div className="flex-center flex-col">
              <Question
                alternative="A"
                answer={question?.options[0] || ""}
                selected={A}
                onClick={() => handleAlternative("A")}
                disabled={state.hiddenQuestions.includes("A")}
              />
              <Question
                alternative="B"
                answer={question?.options[1] || ""}
                selected={B}
                onClick={() => handleAlternative("B")}
                disabled={state.hiddenQuestions.includes("B")}
              />
              <Question
                alternative="C"
                answer={question?.options[2] || ""}
                selected={C}
                onClick={() => handleAlternative("C")}
                disabled={state.hiddenQuestions.includes("C")}
              />
              <Question
                alternative="D"
                answer={question?.options[3] || ""}
                selected={D}
                onClick={() => handleAlternative("D")}
                disabled={state.hiddenQuestions.includes("D")}
              />
            </div>
            <div className="flex-center ml-6 bg-rose-400 rounded-md w-72 h-56">
              <div className="grid grid-cols-3 grid-rows-2 gap-3">
                <button
                  className={
                    !state.helps.cards
                      ? "cursor-not-allowed filter grayscale"
                      : undefined
                  }
                  onClick={handleCardsHelp}
                >
                  <img
                    src={CardsImage}
                    alt="cards"
                    className="w-20 h-20"
                    title="Pedir ajuda das cartas"
                  />
                </button>
                <button
                  className={
                    !state.helps.seminarists
                      ? "cursor-not-allowed filter grayscale"
                      : undefined
                  }
                  onClick={handleSeminaristsHelp}
                >
                  <img
                    src={CollegeStudentsImage}
                    alt="students"
                    className="w-20 h-20"
                    title={
                      state.helps.audience
                        ? "Pedir ajuda aos seminaristas"
                        : "Você já utilizou esta ajuda"
                    }
                  />
                </button>
                <button
                  onClick={handleAudienceHelp}
                  disabled={!state.helps.audience}
                  className={
                    !state.helps.audience
                      ? "cursor-not-allowed filter grayscale"
                      : undefined
                  }
                >
                  <img
                    src={Audience}
                    alt="audience"
                    className="w-20 h-20"
                    title={
                      state.helps.audience
                        ? "Pedir ajuda do auditório"
                        : "Você já utilizou esta ajuda"
                    }
                  />
                </button>

                <SkipButton
                  disabled={state.skips <= 0}
                  handleSkip={handleSkip}
                  color="rose"
                />

                <SkipButton
                  disabled={state.skips <= 1}
                  handleSkip={handleSkip}
                  color="fuchsia"
                />

                <SkipButton
                  disabled={state.skips <= 2}
                  handleSkip={handleSkip}
                  color="purple"
                />
              </div>
            </div>
          </section>
          <section className="flex-center mt-5">
            <div className="flex-center m-3 w-16">
              <Lottie
                options={defaultOptions}
                height={50}
                width={50}
                isStopped={timeOut || correctAnswerState || gameOver || giveUp}
                isPaused={false}
                isClickToPauseDisabled={true}
              />
              <h1 className="text-indigo-400 text-xl text-center font-acme">
                {timer}s
              </h1>
            </div>
            <div className="flex-center">
              <Button
                action="Confirmar"
                bgColor="green"
                onClick={handleAnswer}
              />
              <Button action="Desistir" bgColor="red" onClick={handleGiveUp} />
            </div>
            <div className="flex-center">
              <Reward amount={errorMoney} event="Errar" />
              <Reward amount={stopMoney} event="Parar" />
              <Reward amount={winMoney} event="Acertar" />
            </div>
          </section>
        </div>

        <div className="flex-center flex-col p-5 bg-cullen bg-opacity-10 rounded-lg shadow-2xl ml-10">
          {moneyLevels.map(
            (moneyLevel, index) =>
              moneyLevel.amount !== 0 && (
                <MoneyLevel
                  money={moneyLevel.money}
                  isSet={state.money === moneyLevel.amount}
                  key={index}
                />
              )
          )}
        </div>
      </div>

      <TimeoutModal open={timeOut} />
      <GameOverModal open={gameOver} reference={question?.ref} />
      <CorrectAnswerModal open={correctAnswerState} />
      <GiveUpModal open={giveUp} />
      <SkipModal open={skipState} />

      <AudienceHelpModal
        open={audienceHelp}
        onClose={() => setAudienceHelp(false)}
        correctQuestion={question?.answer}
      />

      <SeminaristHelpModal
        open={seminaristsHelp}
        onClose={() => setSeminaristsHelp(false)}
        correctQuestion={question?.answer}
        levelQuestion={question?.level}
      />

      <SeminaristHelpModal
        open={seminaristsHelp}
        onClose={() => setSeminaristsHelp(false)}
        correctQuestion={question?.answer}
        levelQuestion={question?.level}
      />

      <CardsHelp
        open={cardsHelp}
        onClose={() => setCardsHelp(false)}
        correctQuestion={question?.answer}
      />
    </>
  );
}
