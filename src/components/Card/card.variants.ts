import { cva } from "class-variance-authority";

export const cardVariants = cva(
  "rounded-md border transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-background/60 border-border backdrop-blur-md",
        elevated:
          "bg-background-muted border-border-strong backdrop-blur-md shadow-xl",
        outline: "bg-transparent border-border-strong",
        ghost: "bg-background-muted border-transparent",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      hoverable: {
        true: "hover:border-border-strong hover:shadow-2xl hover:shadow-black/50 cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      hoverable: false,
    },
  },
);
