"use client";

import { useState } from "react";

export default function RiskRewardCalculator() {
  const [target, setTarget] = useState("0");
  const [entryPrice, setEntryPrice] = useState("0");
  const [stopLoss, setStopLoss] = useState("0");
  const [calculationResult, setCalculationResult] = useState({
    riskAmount: 0,
    reward: 0,
    riskRewardRatio: "",
  });

  const handleCalculate = () => {
    const parsedTarget = Number(target) || 0;
    const parsedEntryPrice = Number(entryPrice) || 0;
    const parsedStopLoss = Number(stopLoss) || 0;
    const riskAmount = parsedEntryPrice - parsedStopLoss;
    const reward = parsedTarget - parsedEntryPrice;
    const riskRewardRatio = riskAmount === 0 ? "" : (reward / riskAmount).toFixed(1);

    setCalculationResult({
      riskAmount,
      reward,
      riskRewardRatio,
    });
  }

  return (
    <div className="pt-3 px-3">
      <div className="grid grid-cols-2 gap-1">
        <p className="text-sm font-semibold p-1">Risk: {calculationResult.riskAmount.toFixed(2)}</p>
        <p className="text-sm font-semibold p-1">Reward: {calculationResult.reward.toFixed(2)}</p>
        <p className="text-sm font-semibold p-1">Risk/Reward Ratio: 1 : {calculationResult.riskRewardRatio}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="entryPrice"
            className="block text-sm font-semibold text-gray-700"
          >
            Entry Price
          </label>
          <input
            type="string"
            id="entryPrice"
            className="p-2 mt-1 block w-full rounded-md border border-slate-500 shadow-sm sm:text-sm"
            value={entryPrice}
            onChange={(e) => {
              const regex = /^-?[0-9]*\.?[0-9]*$/;
              if (regex.test(e.target.value)) {
                setEntryPrice(e.target.value);
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="stopLoss"
            className="block text-sm font-semibold text-gray-700"
          >
            Stop Loss
          </label>
          <input
            type="string"
            id="stopLoss"
            className="p-2 mt-1 block w-full rounded-md border border-slate-500 shadow-sm sm:text-sm"
            value={stopLoss}
            onChange={(e) => {
              const regex = /^-?[0-9]*\.?[0-9]*$/;
              if (regex.test(e.target.value)) {
                setStopLoss(e.target.value);
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="target"
            className="block text-sm font-semibold text-gray-700"
          >
            Target
          </label>
          <input
            type="string"
            id="target"
            className="p-2 mt-1 block w-full rounded-md border border-slate-500 shadow-sm sm:text-sm"
            value={target}
            onChange={(e) => {
              const regex = /^-?[0-9]*\.?[0-9]*$/;
              if (regex.test(e.target.value)) {
                setTarget(e.target.value);
              }
            }}
          />
        </div>
      </div>
      <div className="flex justify-between gap-2 mt-6">
        <button
          type="button"
          className="w-full rounded-md border border-teal-700 bg-white px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm hover:bg-teal-200 hover:text-teal-800"
          onClick={() => {
            setEntryPrice("0");
            setStopLoss("0");
            setTarget("0");
            setCalculationResult({
              riskAmount: 0,
              reward: 0,
              riskRewardRatio: "",
            });
          }}
        >
          Reset
        </button>
        <button
          type="button"
          className="w-full rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-800"
          onClick={handleCalculate}
        >
          Calculate
        </button>
      </div>
    </div>
  );
}
