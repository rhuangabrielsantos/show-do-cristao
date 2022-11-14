import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";
import Lottie from "react-lottie";
import { useHistory } from "react-router-dom";

import loadingAnimationData from "../assets/animations/loading.json";
import successAnimationData from "../assets/animations/success.json";

interface ModalProps {
  open: boolean;
}

export default function CorrectAnswerModal({ open }: ModalProps) {
  const history = useHistory();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  function handleRedirect() {
    history.push("/notice");
  }

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        handleRedirect();
      }, 5000);
    }
  }, [open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        auto-reopen="true"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleRedirect}
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all h-96 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex-center w-full h-full">
                <div className="absolute top-5 right-5">
                  <Lottie
                    options={loadingOptions}
                    height={50}
                    width={50}
                    isStopped={false}
                    isPaused={false}
                    isClickToPauseDisabled={true}
                  />
                </div>
                <div className="flex-center flex-col">
                  <Lottie
                    options={defaultOptions}
                    height={230}
                    width={230}
                    isStopped={false}
                    isPaused={false}
                    isClickToPauseDisabled={true}
                  />
                  <h1 className="text-indigo-400 text-xl text-center font-acme">
                    Resposta certa, parabéns!
                  </h1>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
