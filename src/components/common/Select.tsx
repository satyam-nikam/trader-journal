import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  id?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
}

export default function Select({
  label,
  id,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  error,
  disabled = false,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`} ref={wrapperRef}>
      {label && (
        <label
          htmlFor={id}
          className="text-[13px] font-semibold uppercase tracking-wider text-slate-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <button
          id={id}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen((prev) => !prev)}
          className={[
            "flex h-10 w-full items-center justify-between rounded-lg border bg-gray-50 px-3 py-2 text-left text-[13.5px] transition-all duration-150",
            disabled
              ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
              : error
                ? "border-red-400 hover:border-red-500"
                : open
                  ? "border-blue-500 bg-white ring-[3px] ring-blue-500/10"
                  : "border-slate-400 hover:border-slate-500 hover:bg-white",
          ].join(" ")}
        >
          <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
            {selectedOption?.label ?? placeholder}
          </span>
          <IoIosArrowDown
            size={14}
            className={`shrink-0 text-slate-700 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && !disabled && (
          <div className="absolute z-50 mt-1 w-full rounded-xl border border-slate-400 bg-white p-1 shadow-lg shadow-black/5">
            {options.map((option) => {
              const selected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={[
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] transition-colors duration-100",
                    selected ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50",
                  ].join(" ")}
                >
                  <span>{option.label}</span>
                  {selected && <span className="text-[11px] font-bold">✓</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && <span className="text-[11.5px] text-red-500">{error}</span>}
    </div>
  );
}
