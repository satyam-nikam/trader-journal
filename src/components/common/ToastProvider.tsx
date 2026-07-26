"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

type ToastType = "success" | "error" | "warning";

type ToastItem = {
  id: number;
  type: ToastType;
  message: string;
  duration?: number;
};

type ToastContextType = {
  showToast: (type: ToastType, message: string, duration?: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const typeStyles: Record<ToastType, { container: string; icon: string }> = {
  success: {
    container: "border-emerald-200/80 bg-emerald-50/95 text-emerald-900",
    icon: "text-emerald-500",
  },
  error: {
    container: "border-rose-200/80 bg-rose-50/95 text-rose-900",
    icon: "text-rose-500",
  },
  warning: {
    container: "border-amber-200/80 bg-amber-50/95 text-amber-900",
    icon: "text-amber-500",
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, duration = 4000) => {
      const id = Date.now() + Math.random();
      const toast = { id, type, message, duration };

      setToasts((prev) => [...prev, toast]);

      window.setTimeout(() => removeToast(id), duration);
    },
    [removeToast]
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-120 flex w-[min(92vw,360px)] flex-col gap-3">
        {toasts.map((toast) => {
          const Icon =
            toast.type === "success"
              ? FaCheckCircle
              : toast.type === "warning"
                ? FaExclamationTriangle
                : FaTimesCircle;

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur ${typeStyles[toast.type].container}`}
            >
              <div className={`mt-0.5 text-lg ${typeStyles[toast.type].icon}`}>
                <Icon />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold capitalize">{toast.type}</div>
                <div className="text-sm leading-5">{toast.message}</div>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside a ToastProvider");
  }

  return context;
}
