"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { toastVariants } from "./toast.variants";
import { cn } from "../../utils";
import type { VariantProps } from "class-variance-authority";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export type ToastItem = {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
};

const icons: Record<ToastVariant, React.ReactNode> = {
  default: null,
  success: (
    <CheckCircle
      size={16}
      className="text-success-foreground shrink-0 mt-0.5"
    />
  ),
  error: (
    <AlertCircle size={16} className="text-danger-foreground shrink-0 mt-0.5" />
  ),
  warning: (
    <AlertTriangle
      size={16}
      className="text-warning-foreground shrink-0 mt-0.5"
    />
  ),
  info: <Info size={16} className="text-primary shrink-0 mt-0.5" />,
};

type ToastProps = VariantProps<typeof toastVariants> & {
  toast: ToastItem;
  onRemove: (id: string) => void;
};

export const Toast = ({ toast, onRemove }: ToastProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const enterTimer = setTimeout(() => setVisible(true), 10);

    const exitTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, toast.duration ?? 3000);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [toast, onRemove]);

  return (
    <div
      className={cn(
        toastVariants({ variant: toast.variant }),
        "transform transition-all duration-300",
        visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
      )}
    >
      {icons[toast.variant]}

      <p className="flex-1 text-sm text-foreground leading-relaxed">
        {toast.message}
      </p>

      <button
        onClick={() => {
          setVisible(false);
          setTimeout(() => onRemove(toast.id), 300);
        }}
        className="text-foreground-subtle hover:text-foreground transition-colors duration-200 shrink-0 mt-0.5"
      >
        <X size={14} />
      </button>
    </div>
  );
};
