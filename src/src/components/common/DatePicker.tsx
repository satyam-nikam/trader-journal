import { FaRegCalendarAlt } from "react-icons/fa";

interface DatePickerProps {
  label: string;
  htmlFor?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  className?: string;
}

export default function DatePicker({
  label,
  htmlFor,
  value,
  onChange,
  error,
  placeholder,
  className = "",
}: DatePickerProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="text-[13px] font-semibold uppercase tracking-wider text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={htmlFor}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`form-input pr-10 ${error ? "form-input-error" : ""}`}
        />

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-600">
          <FaRegCalendarAlt size={16} />
        </div>
      </div>

      {error && <span className="text-[11.5px] text-red-500">{error}</span>}
    </div>
  );
}
