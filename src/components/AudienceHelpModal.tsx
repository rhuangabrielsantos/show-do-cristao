import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { VscClose } from "react-icons/vsc";
import Lottie from "react-lottie";

import audienceAnimationData from "../assets/animations/audience.json";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  correctQuestion?: string;
}

interface PercentsProps {
  one: number;
  two: number;
  three: number;
  four: number;
}

export default function AudienceHelpModal({
  open,
  onClose,
  correctQuestion,
}: ModalProps) {
  const [percents, setPercents] = useState<PercentsProps>();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: audienceAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const generatePercent = () => {
    const one =
      correctQuestion === "A"
        ? getRandomNumber(25, 45)
        : getRandomNumber(10, 20);
    const two =
      correctQuestion === "B"
        ? getRandomNumber(25, 45)
        : getRandomNumber(10, 20);
    const three =
      correctQuestion === "C"
        ? getRandomNumber(25, 45)
        : getRandomNumber(10, 20);
    const four =
      correctQuestion === "D"
        ? getRandomNumber(25, 45)
        : getRandomNumber(10, 20);

    const total = one + two + three + four;

    const randomIndex = getRandomNumber(1, 4);

    setPercents({
      one: randomIndex === 1 ? one + (100 - total) : one,
      two: randomIndex === 2 ? two + (100 - total) : two,
      three: randomIndex === 3 ? three + (100 - total) : three,
      four: randomIndex === 4 ? four + (100 - total) : four,
    });
  };

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    generatePercent();
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

                <div className="flex-center flex-col gap-5">
                  <div className="grid grid-cols-4 gap-3">
                    <div className="flex-center flex-col gap-5 text-xl h-52 w-28 bg-violet-600 rounded-md">
                      <h1 className="font-acme text-white text-7xl">A</h1>
                      <h2 className="font-acme text-white">{percents?.one}%</h2>
                    </div>
                    <div className="flex-center flex-col gap-5 text-xl h-52 w-28 bg-pink-600 rounded-md">
                      <h1 className="font-acme text-white text-7xl">B</h1>
                      <h2 className="font-acme text-white">{percents?.two}%</h2>
                    </div>
                    <div className="flex-center flex-col gap-5 text-xl h-52 w-28 bg-rose-600 rounded-md">
                      <h1 className="font-acme text-white text-7xl">C</h1>
                      <h2 className="font-acme text-white">
                        {percents?.three}%
                      </h2>
                    </div>
                    <div className="flex-center flex-col gap-5 text-xl h-52 w-28 bg-orange-600 rounded-md">
                      <h1 className="font-acme text-white text-7xl">D</h1>
                      <h2 className="font-acme text-white">
                        {percents?.four}%
                      </h2>
                    </div>
                  </div>

                  <Lottie
                    options={defaultOptions}
                    height={100}
                    width={500}
                    isStopped={false}
                    isPaused={false}
                    isClickToPauseDisabled={true}
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
