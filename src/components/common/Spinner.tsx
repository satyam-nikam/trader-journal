"use client";
import React from "react";

type Props = {
  size?: number;
  className?: string;
  fullscreen?: boolean;
};

export default function Spinner({ size = 40, className = "", fullscreen = true }: Props) {
  const barWidth = Math.max(4, Math.round(size / 6));
  const gap = Math.max(6, Math.round(size / 8));

  const spinnerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "flex-end",
    gap: `${gap}px`,
    height: `${size}px`,
    zIndex: 50,
  };

  const barStyle = (height: string, delay: number): React.CSSProperties => ({
    width: `${barWidth}px`,
    borderRadius: 4,
    transformOrigin: "bottom",
    animation: "updown 900ms cubic-bezier(.2,.6,.2,1) infinite",
    animationDelay: `${delay}ms`,
    height,
  });

  const spinner = (
    <div className={`spinner ${className}`.trim()} style={spinnerStyle} role="status" aria-label="Loading">
      <div style={{ ...barStyle("90%", 0), background: "#e63946" }} />
      <div style={{ ...barStyle("65%", 150), background: "#2a9d8f" }} />
      <div style={{ ...barStyle("50%", 300), background: "#f4a261" }} />
      <style>{`
        .spinner {
          display: flex;
          align-items: flex-end;
          gap: ${gap}px;
          height: ${size}px;
          z-index: 50;
        }

        .spinner > div {
          width: ${barWidth}px;
          border-radius: 4px;
          transform-origin: bottom;
          animation: updown 900ms cubic-bezier(.2,.6,.2,1) infinite;
        }

        @keyframes updown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-40%); }
        }
      `}</style>
    </div>
  );

  if (!fullscreen) {
    return spinner;
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
      {spinner}
    </div>
  );
}
