import * as React from "react";
import ClickAwayListener from "react-click-away-listener";
import { IoChevronDown } from "react-icons/io5";

import { cn } from "@/lib/utils";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  "aria-invalid"?: boolean | "true" | "false";
  error?: string;
};

export function Select({
  options,
  placeholder = "Select",
  value,
  onChange,
  className,
  disabled,
  "aria-invalid": ariaInvalid,
  error,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  const selected = React.useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );

  const handleSelect = (val: string) => {
    onChange?.(val);
    setOpen(false);

    requestAnimationFrame(() => buttonRef.current?.focus());
  };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className={cn("relative w-full", className)}>
        <button
          ref={buttonRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={ariaInvalid}
          disabled={disabled}
          onClick={() => setOpen((p) => !p)}
          className={cn(
            "dark:bg-input/30 border-input h-14 w-full rounded-md border bg-transparent px-4 text-left text-base flex items-center justify-between transition-[color,box-shadow] outline-none",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] cursor-pointer",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            ariaInvalid && "border-destructive ring-destructive/20"
          )}
        >
          <span className={cn(!selected && "text-muted-foreground")}>
            {selected ? selected.label : placeholder}
          </span>

          <IoChevronDown
            aria-hidden
            className={cn(
              "size-5 text-muted-foreground transition-transform",
              open && "rotate-180"
            )}
          />
        </button>

        <div
          className={cn(
            "absolute left-0 right-0 z-50 mt-2 origin-top overflow-hidden rounded-md border border-input bg-popover text-popover-foreground shadow-md",
            open
              ? "animate-fadeIn animate-duration-200"
              : "pointer-events-none hidden"
          )}
          role="listbox"
        >
          <ul className="max-h-64 overflow-y-auto py-1">
            {options.map((opt) => {
              const isActive = opt.value === value;
              return (
                <li key={opt.value} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      "w-full px-4 py-2 text-left text-sm outline-none",
                      "hover:bg-accent hover:text-accent-foreground cursor-pointer",
                      isActive && "bg-accent/70 text-accent-foreground"
                    )}
                  >
                    {opt.label}
                  </button>
                </li>
              );
            })}
            {options.length === 0 && (
              <li className="px-4 py-2 text-sm text-muted-foreground">
                No options
              </li>
            )}
          </ul>
        </div>
        {error && (
          <p className="mt-1 text-sm text-destructive">{error}</p>
        )}
      </div>
    </ClickAwayListener>
  );
}

export type { SelectProps, SelectOption };
