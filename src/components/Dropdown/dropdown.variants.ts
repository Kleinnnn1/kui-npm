import { cva } from "class-variance-authority";

export const dropdownMenuVariants = cva(
  "absolute z-50 min-w-[160px] rounded-md border border-border bg-background/90 backdrop-blur-md shadow-xl p-1 transition-all duration-200",
  {
    variants: {
      align: {
        start: "left-0",
        center: "left-1/2 -translate-x-1/2",
        end: "right-0",
      },
      side: {
        top: "bottom-full mb-2",
        bottom: "top-full mt-2",
      },
    },
    defaultVariants: {
      align: "start",
      side: "bottom",
    },
  },
);

export const dropdownItemVariants = cva(
  "flex items-center gap-2.5 w-full px-3 py-2 text-sm rounded transition-all duration-150 cursor-pointer select-none outline-none",
  {
    variants: {
      variant: {
        default:
          "text-foreground-muted hover:text-foreground hover:bg-background-muted",
        danger:
          "text-danger-foreground hover:text-danger-foreground/80 hover:bg-danger-muted",
        disabled:
          "text-foreground-subtle pointer-events-none cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
