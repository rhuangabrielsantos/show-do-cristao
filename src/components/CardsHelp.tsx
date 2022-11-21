import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { VscClose } from "react-icons/vsc";
import GameContext from "../context/game";
import { AnswerProp } from "../interfaces/Question";

import { CardFlip } from "./CardFlip";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  correctQuestion?: AnswerProp;
}

type CardValuePosibilities = {
  [key in CardValues]: () => void;
};

type CardValues = "A" | "2" | "3" | "K";

export default function CardsHelp({
  open,
  onClose,
  correctQuestion,
}: ModalProps) {
  const cardValues = ["A", "2", "3", "K"];
  const [values, setValues] = useState<string[]>(cardValues);
  const [canFlip, setCanFlip] = useState(true);

  const questionIndex = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
  };

  const { state, setState } = useContext(GameContext);

  function shuffle(array: string[]) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function handleCardsHelp(cardValue: CardValues) {
    setCanFlip(false);

    setState({
      ...state,
      hiddenQuestions: [],
    });

    const cardValuePosibilities: CardValuePosibilities = {
      A: hideOneQuestion,
      "2": hideTwoQuestions,
      "3": hideThreeQuestions,
      K: () => "",
    };

    cardValuePosibilities[cardValue]();

    setTimeout(() => {
      onClose();
    }, 2000);
  }

  function hideOneQuestion() {
    if (!correctQuestion) return;

    const questions: AnswerProp[] = ["A", "B", "C", "D"];
    questions.splice(questionIndex[correctQuestion], 1) as AnswerProp[];

    setState({
      ...state,
      hiddenQuestions: [
        questions[Math.floor(Math.random() * questions.length)],
      ],
    });
  }

  function hideTwoQuestions() {
    if (!correctQuestion) return;

    const questions: AnswerProp[] = ["A", "B", "C", "D"];
    questions.splice(questionIndex[correctQuestion], 1) as AnswerProp[];

    const notHidden: AnswerProp =
      questions[Math.floor(Math.random() * questions.length)];

    const hiddenQuestions: AnswerProp[] = [];

    if (notHidden !== "A" && correctQuestion !== "A") hiddenQuestions.push("A");
    if (notHidden !== "B" && correctQuestion !== "B") hiddenQuestions.push("B");
    if (notHidden !== "C" && correctQuestion !== "C") hiddenQuestions.push("C");
    if (notHidden !== "D" && correctQuestion !== "D") hiddenQuestions.push("D");

    setState({
      ...state,
      hiddenQuestions,
    });
  }

  function hideThreeQuestions() {
    if (!correctQuestion) return;

    const questions: AnswerProp[] = ["A", "B", "C", "D"];
    questions.splice(questionIndex[correctQuestion], 1) as AnswerProp[];

    setState({
      ...state,
      hiddenQuestions: questions,
    });
    return;
  }

  useEffect(() => {
    setValues(shuffle(cardValues));
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        auto-reopen="true"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all py-11 px-80 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white flex-center w-full h-full">
                <button
                  type="button"
                  className="absolute top-5 left-5"
                  title="Feche o Modal"
                  onClick={onClose}
                >
                  <VscClose className="w-10 h-10 text-indigo-400" />
                </button>

                <div className="flex-center gap-5">
                  <CardFlip
                    value={values[0]}
                    onClick={() => handleCardsHelp(values[0] as CardValues)}
                    canFlip={canFlip}
                  />
                  <CardFlip
                    value={values[1]}
                    onClick={() => handleCardsHelp(values[1] as CardValues)}
                    canFlip={canFlip}
                  />
                  <CardFlip
                    value={values[2]}
                    onClick={() => handleCardsHelp(values[2] as CardValues)}
                    canFlip={canFlip}
                  />
                  <CardFlip
                    value={values[3]}
                    onClick={() => handleCardsHelp(values[3] as CardValues)}
                    canFlip={canFlip}
                  />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
