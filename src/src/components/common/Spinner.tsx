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

  const spinner = (
    <div className={`spinner ${className}`} role="status" aria-label="Loading">
      <div className="bar b1" />
      <div className="bar b2" />
      <div className="bar b3" />

      <style jsx>{`
        .spinner {
          display: flex;
          align-items: flex-end;
          gap: ${gap}px;
          height: ${size}px;
          z-index: 50;
        }

        .bar {
          width: ${barWidth}px;
          border-radius: 4px;
          transform-origin: bottom;
          animation: updown 900ms cubic-bezier(.2,.6,.2,1) infinite;
        }

        .b1 {
          background: #e63946;
          height: 90%;
          animation-delay: 0ms;
        }

        .b2 {
          background: #2a9d8f;
          height: 65%;
          animation-delay: 150ms;
        }

        .b3 {
          background: #f4a261;
          height: 50%;
          animation-delay: 300ms;
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
