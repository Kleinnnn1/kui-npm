import { cva } from "class-variance-authority";

export const toastVariants = cva(
  "flex items-start gap-3 w-80 rounded-md border px-4 py-3 text-sm shadow-xl backdrop-blur-md transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-background/80 border-border text-foreground",
        success: "bg-background/80 border-success/30 text-foreground",
        error: "bg-background/80 border-danger/30 text-foreground",
        warning: "bg-background/80 border-warning/30 text-foreground",
        info: "bg-background/80 border-primary/30 text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
