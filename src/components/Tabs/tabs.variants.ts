import { cva } from "class-variance-authority";

export const tabsListVariants = cva(
  "flex items-center gap-1 rounded-md border border-border bg-background-muted p-1 overflow-x-auto scrollbar-none w-full",
  {
    variants: {
      variant: {
        default: "bg-background-muted border-border",
        ghost: "bg-transparent border-transparent",
        outline: "bg-transparent border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium tracking-wide rounded transition-all duration-200 cursor-pointer select-none outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      state: {
        active:
          "bg-background-subtle text-foreground border border-border-strong shadow-sm",
        inactive:
          "text-foreground-subtle hover:text-foreground hover:bg-background-muted",
      },
    },
    defaultVariants: {
      state: "inactive",
    },
  },
);

export const tabsContentVariants = cva(
  "text-foreground-muted text-sm leading-relaxed transition-all duration-200",
  {
    variants: {
      state: {
        active: "block animate-in fade-in-0 duration-200",
        inactive: "hidden",
      },
    },
    defaultVariants: {
      state: "inactive",
    },
  },
);
