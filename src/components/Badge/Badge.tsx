import { type VariantProps } from "class-variance-authority";
import { badgeVariants } from "./badge.variants";
import { cn } from "../../utils";

type BadgeProps = VariantProps<typeof badgeVariants> & {
  children: React.ReactNode;
  className?: string;
};

export const Badge = ({ variant, size, children, className }: BadgeProps) => (
  <span className={cn(badgeVariants({ variant, size }), className)}>
    {children}
  </span>
);
