"use client";

import { useState } from "react";

export default function PandLCalculator() {
  const [exitPrice, setExitPrice] = useState("0");
  const [entryPrice, setEntryPrice] = useState("0");
  const [quantity, setQuantity] = useState("0");
  const [calculationResult, setCalculationResult] = useState({
    profit: 0,
    return: 0,
  });

  const handleCalculate = () => {
    const parsedEntryPrice = Number(entryPrice) || 0;
    const parsedExitPrice = Number(exitPrice) || 0;
    const parsedQuantity = Number(quantity) || 0;
    const profit = (parsedExitPrice - parsedEntryPrice) * parsedQuantity;
    const investment = parsedEntryPrice * parsedQuantity;
    const returnOnInvestment = investment === 0 ? 0 : (profit / investment) * 100;

    setCalculationResult({
      profit,
      return: returnOnInvestment,
    });
  }

  return (
    <div className="pt-3 px-3">
      <div className="grid grid-cols-2 gap-1">
        <p className="text-sm font-semibold p-1">Profit: {calculationResult.profit > 0 ? calculationResult.profit.toFixed(2) : "0.00"}</p>
        <p className="text-sm font-semibold p-1">Loss: {calculationResult.profit < 0 ? -calculationResult.profit.toFixed(2) : "0.00"}</p>
        <p className="text-sm font-semibold p-1">Return: {calculationResult.return.toFixed(2)}%</p>
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
            htmlFor="exitPrice"
            className="block text-sm font-semibold text-gray-700"
          >
            Exit Price
          </label>
          <input
            type="string"
            id="exitPrice"
            className="p-2 mt-1 block w-full rounded-md border border-slate-500 shadow-sm sm:text-sm"
            value={exitPrice}
            onChange={(e) => {
              const regex = /^-?[0-9]*\.?[0-9]*$/;
              if (regex.test(e.target.value)) {
                setExitPrice(e.target.value);
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="quantity"
            className="block text-sm font-semibold text-gray-700"
          >
            Quantity
          </label>
          <input
            type="string"
            id="quantity"
            className="p-2 mt-1 block w-full rounded-md border border-slate-500 shadow-sm sm:text-sm"
            value={quantity}
            onChange={(e) => {
              const regex = /^-?[0-9]*\.?[0-9]*$/;
              if (regex.test(e.target.value)) {
                setQuantity(e.target.value);
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
            setExitPrice("0");
            setQuantity("0");
            setCalculationResult({
              profit: 0,
              return: 0,
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
