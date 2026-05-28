import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "w-full rounded font-medium text-sm text-foreground placeholder:text-foreground-subtle bg-background-muted border transition-all duration-200 outline-none focus:ring-1 disabled:opacity-100 disabled:bg-background/50 disabled:text-foreground-subtle disabled:border-border disabled:placeholder:text-foreground-subtle/50 disabled:cursor-not-allowed disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "border-border focus:border-border-strong focus:ring-ring",
        error:
          "border-danger/50 focus:border-danger/70 focus:ring-danger/20 text-danger-foreground placeholder:text-danger-foreground/50",
        success:
          "border-success/50 focus:border-success/70 focus:ring-success/20",
      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
