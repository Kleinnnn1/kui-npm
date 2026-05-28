import { type VariantProps } from "class-variance-authority";
import { type InputHTMLAttributes } from "react";
import { inputVariants } from "./input.variants";
import { cn } from "../../utils";

type InputProps = VariantProps<typeof inputVariants> &
  Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
    label?: string;
    hint?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    className?: string;
  };

export const Input = ({
  variant,
  size,
  label,
  hint,
  error,
  leftIcon,
  rightIcon,
  className,
  ...props
}: InputProps) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && (
      <label className="text-xs text-foreground-muted tracking-widests uppercase font-medium">
        {label}
      </label>
    )}
    <div className="relative flex items-center">
      {leftIcon && (
        <span className="absolute left-3 text-foreground-subtle">
          {leftIcon}
        </span>
      )}
      <input
        {...props}
        className={cn(
          inputVariants({ variant: error ? "error" : variant, size }),
          leftIcon && "pl-9",
          rightIcon && "pr-9",
          className,
        )}
      />
      {rightIcon && (
        <span className="absolute right-3 text-foreground-subtle">
          {rightIcon}
        </span>
      )}
    </div>
    {error ? (
      <p className="text-xs text-danger-foreground tracking-wide">{error}</p>
    ) : hint ? (
      <p className="text-xs text-foreground-subtle tracking-wide">{hint}</p>
    ) : null}
  </div>
);
