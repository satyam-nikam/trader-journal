"use client";

import { useState } from "react";
import { IoBackspaceOutline } from "react-icons/io5";

type Operation = "+" | "−" | "×" | "÷" | "%";

function calculate(left: number, right: number, operation: Operation) {
  switch (operation) {
    case "+":
      return left + right;
    case "−":
      return left - right;
    case "×":
      return left * right;
    case "÷":
      return right === 0 ? null : left / right;
    case "%":
      return right === 0 ? null : left * (right / 100);
  }
}

function formatNumber(value: number) {
  return String(Number(value.toPrecision(12)));
}

export default function BasicCalculator() {
      const [display, setDisplay] = useState("0");
      const [storedValue, setStoredValue] = useState<number | null>(null);
      const [operation, setOperation] = useState<Operation | null>(null);
      const [replaceDisplay, setReplaceDisplay] = useState(false);

    const enterDigit = (digit: string) => {
    setDisplay((current) =>
      replaceDisplay || current === "0" || current === "Error"
        ? digit
        : `${current}${digit}`,
    );
    setReplaceDisplay(false);
  };

  const enterDecimal = () => {
    if (replaceDisplay || display === "Error") {
      setDisplay("0.");
      setReplaceDisplay(false);
    } else if (!display.includes(".")) {
      setDisplay(`${display}.`);
    }
  };

  const clear = () => {
    setDisplay("0");
    setStoredValue(null);
    setOperation(null);
    setReplaceDisplay(false);
  };

  const chooseOperation = (nextOperation: Operation) => {
    if (display === "Error") {
      clear();
      return;
    }
    const currentValue = Number(display);

    if (storedValue !== null && operation && !replaceDisplay) {
      const result = calculate(storedValue, currentValue, operation);
      if (result === null) {
        setDisplay("Error");
        setStoredValue(null);
        setOperation(null);
        setReplaceDisplay(true);
        return;
      }
      console.log("result", result);
      setDisplay(formatNumber(result));
      setStoredValue(result);
    } else {
      setStoredValue(currentValue);
    }

    setOperation(nextOperation);
    setReplaceDisplay(true);
  };

  const showResult = () => {
    if (storedValue === null || operation === null || display === "Error") return;
    const result = calculate(storedValue, Number(display), operation);
    setDisplay(result === null ? "Error" : formatNumber(result));
    setStoredValue(null);
    setOperation(null);
    setReplaceDisplay(true);
  };

  const backspace = () => {
    if (replaceDisplay || display === "Error") {
      setDisplay("0");
      setReplaceDisplay(false);
      return;
    }
    setDisplay((current) => {
      const shortened = current.slice(0, -1);
      return shortened === "" || shortened === "-" ? "0" : shortened;
    });
  };

    const keys: Array<{ label: string; action: () => void; style?: string; ariaLabel?: string }> = [
    { label: "AC", action: clear, style: "text-rose-700" },
    { label: "%", action: () => chooseOperation("%"), style: "text-rose-700" },
    { label: "⌫", action: backspace, ariaLabel: "Backspace" },
    { label: "÷", action: () => chooseOperation("÷"), style: "text-teal-700" },
    { label: "7", action: () => enterDigit("7") },
    { label: "8", action: () => enterDigit("8") },
    { label: "9", action: () => enterDigit("9") },
    { label: "×", action: () => chooseOperation("×"), style: "text-teal-700" },
    { label: "4", action: () => enterDigit("4") },
    { label: "5", action: () => enterDigit("5") },
    { label: "6", action: () => enterDigit("6") },
    { label: "−", action: () => chooseOperation("−"), style: "text-teal-700" },
    { label: "1", action: () => enterDigit("1") },
    { label: "2", action: () => enterDigit("2") },
    { label: "3", action: () => enterDigit("3") },
    { label: "+", action: () => chooseOperation("+"), style: "text-teal-700" },
    { label: "0", action: () => enterDigit("0"), style: "col-span-2" },
    { label: ".", action: enterDecimal },
    { label: "=", action: showResult, style: "bg-teal-700 text-white hover:bg-teal-800" },
  ];

  return (
    <>
    <output
            aria-live="polite"
            className="block min-h-20 overflow-hidden px-4 py-5 text-right text-3xl font-semibold tabular-nums text-slate-900"
          >
            {display}
          </output>

    <div className="grid grid-cols-4 gap-2 p-3 pt-0">
      {keys.map(({ label, action, style = "", ariaLabel }) => (
        <button
          key={label}
          type="button"
          aria-label={ariaLabel ?? label}
          onClick={action}
          className={`flex h-12 items-center justify-center rounded-lg bg-slate-100 text-base font-medium text-slate-800 transition hover:bg-slate-200 active:scale-[0.98] ${style}`}
        >
          {label === "⌫" ? <IoBackspaceOutline size={20} /> : label}
        </button>
      ))}
    </div>
    </>
    
  );
}
