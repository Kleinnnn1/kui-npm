"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { type VariantProps } from "class-variance-authority";
import { avatarVariants, statusVariants } from "./avatar.variants";
import { cn } from "../../utils";

type AvatarStatus = "online" | "offline" | "busy" | "away";
type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

type AvatarProps = VariantProps<typeof avatarVariants> & {
  src?: string;
  alt?: string;
  fallback?: string;
  status?: AvatarStatus;
  className?: string;
};

type AvatarGroupProps = {
  children: React.ReactNode;
  max?: number;
  size?: AvatarSize;
  className?: string;
};

const iconSizes: Record<AvatarSize, number> = {
  xs: 12,
  sm: 14,
  md: 18,
  lg: 22,
  xl: 28,
};

export const Avatar = ({
  src,
  alt,
  fallback,
  status,
  size = "md",
  className,
}: AvatarProps) => {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;

  return (
    <div className={cn(avatarVariants({ size }), className)}>
      {showImage && (
        <img
          src={src}
          alt={alt ?? fallback ?? "avatar"}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      )}
      {!showImage && fallback && (
        <span className="uppercase tracking-wide select-none">
          {fallback.slice(0, 2)}
        </span>
      )}
      {!showImage && !fallback && (
        <User
          size={iconSizes[size as AvatarSize] ?? 18}
          className="text-foreground-subtle"
        />
      )}
      {status && <span className={cn(statusVariants({ status, size }))} />}
    </div>
  );
};

export const AvatarGroup = ({
  children,
  max,
  size = "md",
  className,
}: AvatarGroupProps) => {
  const childArray = Array.isArray(children) ? children : [children];
  const visible = max ? childArray.slice(0, max) : childArray;
  const overflow = max ? childArray.length - max : 0;

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((child, i) => (
        <div
          key={i}
          className="ring-2 ring-background rounded-full"
          style={{ marginLeft: i === 0 ? 0 : "-8px", zIndex: i }}
        >
          {child}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            avatarVariants({ size }),
            "ring-2 ring-background bg-background-muted text-foreground-muted text-xs",
          )}
          style={{ marginLeft: "-8px", zIndex: visible.length }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
};
