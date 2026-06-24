const BTN_STYLE = {
  primary: "bg-[#2c2c2c] text-[#ffffff] rounded-lg cursor-pointer hover:bg-[#3a3a3a]",
  secondary: "border border-[#2c2c2c] text-[#2c2c2c] bg-[#ffffff] rounded-lg cursor-pointer",
  danger: "text-[#ffffff] bg-[#dc3545] rounded-lg cursor-pointer hover:bg-[#e35d6a]"
} as const;

const BTN_SIZE = {
  icon: "p-2 text-sm",
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
  xl: "px-8 py-4 text-lg"
} as const;

type ButtonVariant = keyof typeof BTN_STYLE;

type ButtonSize = keyof typeof BTN_SIZE;

interface ButtonProps {
  btnType?: ButtonVariant;
  text?: string;
  size?: ButtonSize;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  type,
  btnType = "primary",
  text,
  size = "md",
  className = "",
  onClick,
  loading = false,
  disabled = false,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      onClick?.(event);
    }
  };

  return (
    <button
      className={`
        ${BTN_STYLE[btnType] || BTN_STYLE.primary}
        ${BTN_SIZE[size]}
        ${className}
        ${isDisabled ? "opacity-50 pointer-events-none" : ""}
      `}
      onClick={handleClick}
      disabled={isDisabled}
      type={type}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          {text && <span>{text}</span>}

        </>
      )}
    </button>
  );
};