import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { VscClose } from "react-icons/vsc";
import Lottie from "react-lottie";

import seminaristsAnimationData from "../assets/animations/seminarists.json";
import { LevelQuestionProp } from "../interfaces/Question";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  correctQuestion?: string;
  levelQuestion?: LevelQuestionProp;
}

interface AnswersProps {
  isaque?: string;
  emanuel?: string;
  sara?: string;
}

type LevelQuestionPosibilits = {
  [key in LevelQuestionProp]: AnswersProps;
};

export default function SeminaristHelpModal({
  open,
  onClose,
  correctQuestion,
  levelQuestion,
}: ModalProps) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: seminaristsAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [answers, setAnswers] = useState<AnswersProps>();

  function handleSeminaristsAnswers() {
    if (!levelQuestion) return;

    const questions = ["A", "B", "C", "D"];

    const levelQuestionPosibilits: LevelQuestionPosibilits = {
      easy: {
        emanuel: correctQuestion,
        isaque: correctQuestion,
        sara: correctQuestion,
      },
      medium: {
        emanuel: questions[Math.floor(Math.random() * questions.length)],
        isaque: correctQuestion,
        sara: correctQuestion,
      },
      hard: {
        emanuel: questions[Math.floor(Math.random() * questions.length)],
        isaque: correctQuestion,
        sara: questions[Math.floor(Math.random() * questions.length)],
      },
      extreme: {},
    };

    setAnswers(levelQuestionPosibilits[levelQuestion]);
  }

  useEffect(() => {
    handleSeminaristsAnswers();
  }, [correctQuestion, levelQuestion]);

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
                  <Lottie
                    options={defaultOptions}
                    height={300}
                    width={400}
                    isStopped={false}
                    isPaused={false}
                    isClickToPauseDisabled={true}
                  />

                  <div className="flex-center flex-col gap-2">
                    <div className="flex-center flex-col gap-2 w-36 h-28 rounded-md bg-isaque">
                      <h1 className="text-white font-acme text-2xl">Isaque</h1>
                      <h2 className="text-white font-acme text-4xl">
                        {answers?.isaque}
                      </h2>
                    </div>

                    <div className="flex-center flex-col gap-2 w-36 h-28 rounded-md bg-emanuel">
                      <h1 className="text-white font-acme text-2xl">Emanuel</h1>
                      <h2 className="text-white font-acme text-4xl">
                        {answers?.emanuel}
                      </h2>
                    </div>

                    <div className="flex-center flex-col gap-2 w-36 h-28 rounded-md bg-sara">
                      <h1 className="text-white font-acme text-2xl">Sara</h1>
                      <h2 className="text-white font-acme text-4xl">
                        {answers?.sara}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
