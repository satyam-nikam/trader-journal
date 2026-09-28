"use client";

import { useState } from "react";
import { IoBackspaceOutline, IoClose } from "react-icons/io5";
import { MdCalculate } from "react-icons/md";
import BasicCalculator from "./BasicCalculator";
import PositionSizeCalculator from "./PositionSizeCalculator";

export default function CalculatorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("calculator");

  return (
    <div className="fixed bottom-10 right-10 z-40">
      {isOpen && (
        <section
          aria-label="Calculator"
          className="mb-3 w-[min(25rem,calc(100vw-2.5rem))] h-[min(22rem,calc(100vw-2.5rem))] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
          role="dialog"
        >
          <header className="flex h-12 items-center justify-between border-b border-slate-200 px-4">
            <button
              type="button"
              className={`text-sm font-semibold rounded p-1 ${activeTab === "calculator" ? "text-slate-900 bg-slate-200" : "text-slate-500 hover:bg-slate-100"}`}
              onClick={() => setActiveTab("calculator")}
            >
              Calculator
            </button>
            <button
              type="button"
              className={`text-sm font-semibold rounded p-1 ${activeTab === "position-size" ? "text-slate-900 bg-slate-200" : "text-slate-500 hover:bg-slate-100"}`}
              onClick={() => setActiveTab("position-size")}
            >
              Position Size
            </button>
            <button
              type="button"
              className={`text-sm font-semibold rounded p-1 ${activeTab === "risk-reward" ? "text-slate-900 bg-slate-200" : "text-slate-500 hover:bg-slate-100"}`}
              onClick={() => setActiveTab("risk-reward")}
            >
              Risk/Reward
            </button>
            <button
              type="button"
              className={`text-sm font-semibold rounded p-1 ${activeTab === "pl" ? "text-slate-900 bg-slate-200" : "text-slate-500 hover:bg-slate-100"}`}
              onClick={() => setActiveTab("pl")}
            >
              P&L
            </button>
            <button
              type="button"
              aria-label="Close calculator"
              onClick={() => setIsOpen(false)}
              className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              <IoClose size={20} />
            </button>
          </header>

          {activeTab === "calculator" && <BasicCalculator />}
          {activeTab === "position-size" && <PositionSizeCalculator />}
        </section>
      )}

      <button
        type="button"
        aria-label={isOpen ? "Close calculator" : "Open calculator"}
        aria-expanded={isOpen}
        title="Calculator"
        onClick={() => setIsOpen((open) => !open)}
        className="ml-auto flex !h-14 w-14 items-center justify-center !rounded-full bg-teal-700 text-white shadow-lg transition hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
      >
        <MdCalculate size={30} />
      </button>
    </div>
  );
}