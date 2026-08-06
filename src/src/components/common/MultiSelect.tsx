import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label?: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

export default function MultiSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Choose options",
  className = "",
  error,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggle(val: string) {
    onChange(value.includes(val) ? value.filter((v) => v !== val) : [...value, val]);
  }

  function remove(val: string, e: React.MouseEvent) {
    e.stopPropagation();
    onChange(value.filter((v) => v !== val));
  }

  return (
    <div className={`flex flex-col gap-1.5 ${className}`} ref={wrapperRef}>
      {label && (
        <label className="text-[13px] font-semibold uppercase tracking-wider text-slate-700">
          {label}
        </label>
      )}

      {/* Trigger */}
      <div
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        tabIndex={0}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((o) => !o); }
          if (e.key === "Escape") setOpen(false);
        }}
        className={[
          "relative flex min-h-10 flex-wrap gap-1.5 cursor-pointer select-none",
          "rounded-lg border bg-gray-50 px-2.5 py-2 transition-all duration-150",
          "outline-none",
          open
            ? "border-blue-500 bg-white ring-[3px] ring-blue-500/10"
            : error
            ? "border-red-400 hover:border-red-500"
            : "border-slate-400 hover:border-slate-500 hover:bg-white",
        ].join(" ")}
      >
        {value.length === 0 && (
          <span className="self-center text-[13.5px] text-gray-300">{placeholder}</span>
        )}

        {value.map((val) => {
          const opt = options.find((o) => o.value === val);
          return (
            <span
              key={val}
              className="flex items-center gap-1 rounded-full bg-blue-50 pl-2.5 pr-1.5 py-0.5 text-[12px] font-medium text-blue-700"
            >
              {opt?.label}
              <button
                type="button"
                onClick={(e) => remove(val, e)}
                aria-label={`Remove ${opt?.label}`}
                className="flex items-center justify-center text-blue-300 hover:text-blue-700 transition-colors text-[15px] leading-none"
              >
                ×
              </button>
            </span>
          );
        })}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          className="absolute z-50 mt-1 w-full rounded-xl border border-slate-400 bg-white p-1 shadow-lg shadow-black/5"
          style={{ top: "100%" }}
        >
          {options.map((opt) => {
            const selected = value.includes(opt.value);
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={selected}
                onClick={(e) => { e.stopPropagation(); toggle(opt.value); }}
                className={[
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] cursor-pointer transition-colors duration-100",
                  selected
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50",
                ].join(" ")}
              >
                <span className="w-3.5 text-[11px] font-bold text-blue-500">
                  {selected ? "✓" : ""}
                </span>
                {opt.label}
              </div>
            );
          })}
        </div>
      )}

      {error && <span className="text-[11.5px] text-red-500">{error}</span>}
    </div>
  );
}