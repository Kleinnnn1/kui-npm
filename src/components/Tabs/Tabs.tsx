"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { type VariantProps } from "class-variance-authority";
import {
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
} from "./tabs.variants";
import { cn } from "../../utils";

type TabsContextType = {
  value: string;
  setValue: (value: string) => void;
  listRef: React.RefObject<HTMLDivElement | null>;
};

const TabsContext = createContext<TabsContextType | null>(null);

const useTabs = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("useTabs must be used inside Tabs");
  return ctx;
};

type TabsProps = {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
};

export const Tabs = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}: TabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const listRef = useRef<HTMLDivElement | null>(null);
  const controlled = value !== undefined;
  const currentValue = controlled ? value! : internalValue;

  const handleChange = (val: string) => {
    if (!controlled) setInternalValue(val);
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider
      value={{ value: currentValue, setValue: handleChange, listRef }}
    >
      <div className={cn("flex flex-col gap-4", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

type TabsListProps = VariantProps<typeof tabsListVariants> & {
  children: ReactNode;
  className?: string;
};

export const TabsList = ({ children, variant, className }: TabsListProps) => {
  const { listRef, value, setValue } = useTabs();

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not([disabled])',
      ) ?? [],
    );
    if (!tabs.length) return;

    const current = document.activeElement;
    const index = tabs.indexOf(current as HTMLButtonElement);

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = tabs[index + 1] ?? tabs[0];
      next.focus();
      // Activate on arrow key per ARIA tabs pattern
      next.click();
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = tabs[index - 1] ?? tabs[tabs.length - 1];
      prev.focus();
      prev.click();
    }

    if (e.key === "Home") {
      e.preventDefault();
      tabs[0].focus();
      tabs[0].click();
    }

    if (e.key === "End") {
      e.preventDefault();
      tabs[tabs.length - 1].focus();
      tabs[tabs.length - 1].click();
    }
  };

  return (
    <div
      ref={listRef as React.RefObject<HTMLDivElement>}
      role="tablist"
      aria-orientation="horizontal"
      onKeyDown={handleKeyDown}
      className={cn(
        tabsListVariants({ variant }),
        "flex w-full overflow-x-auto scrollbar-none",
        className,
      )}
    >
      {children}
    </div>
  );
};

type TabsTriggerProps = {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
};

export const TabsTrigger = ({
  value,
  children,
  className,
  disabled,
  icon,
}: TabsTriggerProps) => {
  const { value: currentValue, setValue } = useTabs();
  const isActive = currentValue === value;
  const panelId = `panel-${value}`;
  const tabId = `tab-${value}`;

  return (
    <button
      id={tabId}
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      aria-disabled={disabled}
      disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      onClick={() => !disabled && setValue(value)}
      className={cn(
        tabsTriggerVariants({ state: isActive ? "active" : "inactive" }),
        "flex-1 shrink-0 whitespace-nowrap",
        className,
      )}
    >
      {icon && (
        <span className="mr-1.5 shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};

type TabsContentProps = {
  value: string;
  children: ReactNode;
  className?: string;
};

export const TabsContent = ({
  value,
  children,
  className,
}: TabsContentProps) => {
  const { value: currentValue } = useTabs();
  const isActive = currentValue === value;
  const panelId = `panel-${value}`;
  const tabId = `tab-${value}`;

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      tabIndex={0}
      hidden={!isActive}
      className={cn(
        tabsContentVariants({ state: isActive ? "active" : "inactive" }),
        className,
      )}
    >
      {children}
    </div>
  );
};
