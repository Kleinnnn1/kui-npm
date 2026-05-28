import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium tracking-widest uppercase transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-background-muted text-foreground",
        success: "bg-success-muted text-success-foreground",
        warning: "bg-warning-muted text-warning-foreground",
        danger: "bg-danger-muted text-danger-foreground",
        muted: "bg-background-muted text-foreground-muted",
        solid: "bg-primary text-primary-foreground",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
