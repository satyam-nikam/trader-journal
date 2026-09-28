"use client";

import { useState } from "react";

export default function PositionSizeCalculator() {
  const [capital, setCapital] = useState(0);
  const [risk, setRisk] = useState(0);
  const [entryPrice, setEntryPrice] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);
  const [calculationResult, setCalculationResult] = useState({
    riskAmount: 0,
    riskPerShare: 0,
    quantity: 0,
  });

  const handleCalculate = () => {
    const riskAmount = (capital * risk) / 100;
    const riskPerShare = Math.abs(entryPrice - stopLoss);
    const quantity = riskAmount / riskPerShare;

    setCalculationResult({
      riskAmount,
      riskPerShare,
      quantity,
    });
  }

  return (
    <div className="pt-3 px-3">
      <div className="grid grid-cols-2 gap-1">
        <p className="text-sm font-semibold p-1">Risk Amount: {calculationResult.riskAmount.toFixed(2)}</p>
        <p className="text-sm font-semibold p-1">Risk/Share: {calculationResult.riskPerShare.toFixed(2)}</p>
        <p className="text-sm font-semibold p-1">Quantity: {Math.floor(calculationResult.quantity)}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="capital"
            className="block text-sm font-semibold text-gray-700"
          >
            Capital
          </label>
          <input
            type="string"
            id="capital"
            className="p-2 mt-1 block w-full rounded-md border border-slate-500 shadow-sm sm:text-sm"
            value={capital}
            onChange={(e) => {
              const regex = /^-?[0-9]*\.?[0-9]*$/;
              if (regex.test(e.target.value)) {
                setCapital(parseFloat(e.target.value));
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="risk"
            className="block text-sm font-semibold text-gray-700"
          >
            Risk %
          </label>
          <input
            type="string"
            id="risk"
            className="p-2 mt-1 block w-full rounded-md border border-slate-500 shadow-sm sm:text-sm"
            value={risk}
            onChange={(e) => {
              const regex = /^-?[0-9]*\.?[0-9]*$/;
              if (regex.test(e.target.value)) {
                setRisk(parseFloat(e.target.value));
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="entry"
            className="block text-sm font-semibold text-gray-700"
          >
            Entry Price
          </label>
          <input
            type="string"
            id="entry"
            className="p-2 mt-1 block w-full rounded-md border border-slate-500 shadow-sm sm:text-sm"
            value={entryPrice}
            onChange={(e) => {
              const regex = /^-?[0-9]*\.?[0-9]*$/;
              if (regex.test(e.target.value)) {
                setEntryPrice(parseFloat(e.target.value));
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="stop-loss"
            className="block text-sm font-semibold text-gray-700"
          >
            Stop Loss
          </label>
          <input
            type="string"
            id="stop-loss"
            className="p-2 mt-1 block w-full rounded-md border border-slate-500 shadow-sm sm:text-sm"
            value={stopLoss}
            onChange={(e) => {
              const regex = /^-?[0-9]*\.?[0-9]*$/;
              if (regex.test(e.target.value)) {
                setStopLoss(parseFloat(e.target.value));
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
            setCapital(0);
            setRisk(0);
            setEntryPrice(0);
            setStopLoss(0);
            setCalculationResult({
              riskAmount: 0,
              riskPerShare: 0,
              quantity: 0,
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
