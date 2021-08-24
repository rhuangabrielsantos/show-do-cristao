import React from 'react';

interface MoneyLevelProps {
  money: string;
  isSet?: boolean;
}

export default function MoneyLevel({ money, isSet }: MoneyLevelProps) {
  return (
    <div
      className={`${
        isSet ? `bg-rose-600` : `bg-indigo-400`
      } w-56 h-8 flex-center rounded-lg mt-1 text-cullen font-acme`}>
      {money}
    </div>
  );
}
