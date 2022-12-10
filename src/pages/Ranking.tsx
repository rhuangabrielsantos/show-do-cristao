import React from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { useHistory } from "react-router-dom";

import Footer from "../components/Footer";
import { moneyLevels } from "../data/moneyLevels";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface RankingUser {
  name: string;
  money: number;
}

export default function Ranking() {
  const history = useHistory();

  const [storedValue] = useLocalStorage({
    defaultValue: [],
    key: "ranking",
  });

  return (
    <div className="flex-center flex-col gap-5 bg-paper w-screen h-screen">
      <VscArrowLeft
        className="absolute top-5 left-5 text-indigo-400 w-9 h-9 cursor-pointer"
        onClick={() => history.push("/")}
      />

      <div className="w-96 h-96">
        <h1 className="text-warmGray-800 text-4xl text-center font-acme uppercase pb-5">
          Ranking
        </h1>

        {storedValue
          .sort((a: RankingUser, b: RankingUser) => b.money - a.money)
          .map(
            (user: RankingUser, index: number) =>
              index <= 9 && (
                <div key={index} className="flex justify-between w-96">
                  <h1 className="font-acme text-warmGray-800 text-2xl">
                    {user.name}
                  </h1>

                  <h1 className="font-acme text-warmGray-800 text-2xl">
                    {
                      moneyLevels.find((levels) => levels.amount === user.money)
                        ?.money
                    }
                  </h1>
                </div>
              )
          )}
      </div>
      <Footer />
    </div>
  );
}
