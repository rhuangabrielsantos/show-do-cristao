import React from 'react';

import MoneyImage from '../assets/money.png';

interface RewardProps {
  amount: number;
  event: string;
}

export default function Reward({ amount, event }: RewardProps) {
  return (
    <div className="flex-center m-3">
      <img src={MoneyImage} alt="money" className="h-12 w-12" />
      <div className="flex-center flex-col">
        <h1 className="font-acme text-xl">{amount} MIL</h1>
        <h1 className="font-acme">{event}</h1>
      </div>
    </div>
  );
}
