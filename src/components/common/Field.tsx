export default function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
}) {
    return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-[13px] font-semibold uppercase tracking-wider text-slate-700"
      >
        {label}
      </label>
      {children}
      {error && <span className="text-[11.5px] text-red-500">{error}</span>}
    </div>
  );
}