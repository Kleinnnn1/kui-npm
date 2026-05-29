"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { type VariantProps } from "class-variance-authority";
import {
  dropdownMenuVariants,
  dropdownItemVariants,
} from "./dropdown.variants";
import { cn } from "../../utils";

type DropdownContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  triggerRef: React.RefObject<HTMLDivElement | null>;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

const useDropdown = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("useDropdown must be used inside Dropdown");
  return ctx;
};

type DropdownProps = {
  children: ReactNode;
  className?: string;
};

export const Dropdown = ({ children, className }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen, menuRef, triggerRef }}>
      <div ref={ref} className={cn("relative inline-block", className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

type DropdownTriggerProps = {
  children: ReactNode;
  className?: string;
};

export const DropdownTrigger = ({
  children,
  className,
}: DropdownTriggerProps) => {
  const { open, setOpen, menuRef, triggerRef } = useDropdown();

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(!open);

      if (!open) {
        setTimeout(() => {
          const first = menuRef.current?.querySelector<HTMLElement>(
            '[role="menuitem"]:not([disabled])',
          );
          first?.focus();
        }, 50);
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setTimeout(() => {
        const first = menuRef.current?.querySelector<HTMLElement>(
          '[role="menuitem"]:not([disabled])',
        );
        first?.focus();
      }, 50);
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div
      ref={triggerRef as React.RefObject<HTMLDivElement>}
      role="button"
      tabIndex={0}
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      onKeyDown={handleKeyDown}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </div>
  );
};

type DropdownMenuProps = VariantProps<typeof dropdownMenuVariants> & {
  children: ReactNode;
  className?: string;
};

export const DropdownMenu = ({
  children,
  align,
  side,
  className,
}: DropdownMenuProps) => {
  const { open, setOpen, menuRef, triggerRef } = useDropdown();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        setOpen(false);

        triggerRef.current?.focus();
        return;
      }

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const items = Array.from(
          menuRef.current?.querySelectorAll<HTMLElement>(
            '[role="menuitem"]:not([disabled])',
          ) ?? [],
        );
        if (!items.length) return;

        const current = document.activeElement;
        const index = items.indexOf(current as HTMLElement);

        if (e.key === "ArrowDown") {
          const next = items[index + 1] ?? items[0];
          next.focus();
        } else {
          const prev = items[index - 1] ?? items[items.length - 1];
          prev.focus();
        }
      }

      if (e.key === "Home") {
        e.preventDefault();
        const items = menuRef.current?.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([disabled])',
        );
        items?.[0]?.focus();
      }
      if (e.key === "End") {
        e.preventDefault();
        const items = menuRef.current?.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([disabled])',
        );
        items?.[items.length - 1]?.focus();
      }
    },
    [setOpen, triggerRef, menuRef],
  );

  if (!open) return null;

  return (
    <div
      ref={menuRef as React.RefObject<HTMLDivElement>}
      role="menu"
      aria-orientation="vertical"
      onKeyDown={handleKeyDown}
      className={cn(
        dropdownMenuVariants({ align, side }),
        "animate-in fade-in-0 zoom-in-95 duration-150",
        className,
      )}
    >
      {children}
    </div>
  );
};

type DropdownItemProps = VariantProps<typeof dropdownItemVariants> & {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export const DropdownItem = ({
  children,
  icon,
  variant,
  onClick,
  className,
  disabled,
}: DropdownItemProps) => {
  const { setOpen, triggerRef } = useDropdown();

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    setOpen(false);

    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      role="menuitem"
      aria-disabled={disabled}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(dropdownItemVariants({ variant }), className)}
    >
      {icon && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};

export const DropdownSeparator = ({ className }: { className?: string }) => (
  <div role="separator" className={cn("my-1 h-px bg-border", className)} />
);

export const DropdownLabel = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    role="presentation"
    className={cn(
      "px-3 py-1.5 text-xs text-foreground-subtle tracking-widests uppercase",
      className,
    )}
  >
    {children}
  </div>
);
