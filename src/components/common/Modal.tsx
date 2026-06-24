import React from "react";

type ModalProps = {
	isOpen: boolean;
	header?: React.ReactNode;
	footer?: React.ReactNode;
	onClose?: () => void;
	children?: React.ReactNode;
	className?: string;
};

const Modal: React.FC<ModalProps> = ({
	isOpen,
	header,
	footer,
	onClose,
	children,
	className,
}) => {
	React.useEffect(() => {
		if (!isOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [isOpen]);

	React.useEffect(() => {
		if (!isOpen) return;
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose?.();
		};
		document.addEventListener("keydown", handleKey);
		return () => document.removeEventListener("keydown", handleKey);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center"
			role="dialog"
			aria-modal="true"
		>
			<div
				className="fixed inset-0"
				style={{ background: "rgba(0,0,0,0.5)" }}
				onClick={onClose}
			/>

			<div
				className={`bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 relative overflow-hidden ${
					className ?? ""
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				<div
					style={{ background: "#2c2c2c" }}
					className="px-4 py-3 text-white flex items-center justify-between text-lg"
				>
					<div>{header}</div>
					<button
						aria-label="Close modal"
						onClick={onClose}
						className="text-white text-2xl leading-none"
						style={{ background: "transparent", border: "none" }}
					>
						&times;
					</button>
				</div>

				<div className="p-4">{children}</div>

				{footer && (
					<div className="px-4 py-3 border-t border-[#b2b2b2] shadow-md flex justify-center">{footer}</div>
				)}
			</div>
		</div>
	);
};

export default Modal;
