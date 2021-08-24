import React, { useState } from 'react';

import Audience from '../assets/audience.png';
import CardsImage from '../assets/cards.png';
import CollegeStudentsImage from '../assets/college-students.png';
import LogoImg from '../assets/logo.png';
import SkipImage from '../assets/skip.png';
import Button from '../components/Button';
import Hourglass from '../components/Hourglass';
import Modal from '../components/Modal';
import MoneyLevel from '../components/MoneyLevel';
import Question from '../components/Question';
import Reward from '../components/Reward';
import { moneyLevels } from '../mocks/moneyLevels';

export default function Game() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex-center bg-paper w-screen h-screen">
        <div>
          <section className="flex-center">
            <img src={LogoImg} alt="logo" className="w-72 mr-7" />
            <div className="flex-center flex-col w-96 h-36 bg-indigo-400 rounded-md">
              <h1 className="text-cullen text-xl text-center font-acme uppercase">
                Quem veio do oriente visitar o recém-nascido Jesus?
              </h1>
            </div>
          </section>
          <section className="flex-center mt-5">
            <div className="flex-center flex-col">
              <Question alternative="A" answer="A corte de herodes" selected={false} />
              <Question alternative="B" answer="Pastores de Belém" selected={false} />
              <Question alternative="C" answer="O povo hebreu" selected={false} />
              <Question alternative="D" answer="Três reis magos" selected={false} />
            </div>
            <div className="flex-center ml-6 bg-rose-400 rounded-md w-72 h-56">
              <div className="grid grid-cols-3 grid-rows-2 gap-3">
                <button onClick={() => setOpen(true)}>
                  <img
                    src={CardsImage}
                    alt="cards"
                    className="w-20 h-20"
                    title="Pedir ajuda das cartas"
                  />
                </button>
                <button>
                  <img
                    src={CollegeStudentsImage}
                    alt="students"
                    className="w-20 h-20"
                    title="Pedir ajuda aos universitários"
                  />
                </button>
                <button>
                  <img
                    src={Audience}
                    alt="audience"
                    className="w-20 h-20"
                    title="Pedir ajuda do auditório"
                  />
                </button>
                <button>
                  <div className="flex-center bg-amber-100 w-20 h-20 rounded-md">
                    <img src={SkipImage} alt="skip" className="w-14 h-14" title="Pular" />
                  </div>
                </button>
                <button>
                  <div className="flex-center bg-rose-200 w-20 h-20 rounded-md">
                    <img src={SkipImage} alt="skip" className="w-14 h-14" title="Pular" />
                  </div>
                </button>
                <button>
                  <div className="flex-center bg-violet-300 w-20 h-20 rounded-md">
                    <img src={SkipImage} alt="skip" className="w-14 h-14" title="Pular" />
                  </div>
                </button>
              </div>
            </div>
          </section>
          <section className="flex-center mt-5">
            <div className="m-5">
              <Hourglass />
            </div>
            <div className="flex-center">
              <Button action="Sim" bgColor="green" />
              <Button action="Não" bgColor="red" />
              <Button action="Parar" bgColor="yellow" />
            </div>
            <div className="flex-center">
              <Reward amount={1} event="Errar" />
              <Reward amount={2} event="Parar" />
              <Reward amount={5} event="Acertar" />
            </div>
          </section>
        </div>

        <div className="flex-center flex-col p-5 bg-cullen bg-opacity-10 rounded-lg shadow-2xl ml-10">
          {moneyLevels.map((moneyLevel, index) => (
            <MoneyLevel money={moneyLevel.money} isSet={moneyLevel.isSet} key={index} />
          ))}
        </div>
      </div>

      <Modal open={open} setOpen={setOpen}>
        <h1>Hello World</h1>
      </Modal>
    </>
  );
}
