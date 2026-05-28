import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded font-medium tracking-widest uppercase transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        solid: "bg-primary text-primary-foreground hover:bg-primary/90",
        ghost:
          "border border-border-strong text-foreground bg-background-muted hover:bg-background-subtle hover:border-border-strong",
        danger:
          "border border-danger/40 text-danger-foreground bg-danger-muted hover:bg-danger/20",
        muted:
          "text-foreground-muted bg-background-muted hover:bg-background-subtle",
      },
      size: {
        sm: "px-3 py-1 text-xs",
        md: "px-6 py-2 text-sm",
        lg: "px-8 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  },
);
