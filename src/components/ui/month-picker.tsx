import * as React from "react";
import ClickAwayListener from "react-click-away-listener";
import { IoChevronDown, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { cn } from "@/lib/utils";

type MonthPickerProps = {
  value?: string; // format: YYYY-MM
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  "aria-invalid"?: boolean | "true" | "false";
  error?: string;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function MonthPicker({
  value,
  onChange,
  placeholder = "Enter Month",
  className,
  disabled,
  "aria-invalid": ariaInvalid,
  error,
}: MonthPickerProps) {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  const parsed = React.useMemo(() => {
    if (!value) return null;
    const match = /^(\d{4})-(\d{2})$/.exec(value);
    if (!match) return null;
    const [, y, m] = match;
    return { year: Number(y), monthIndex: Number(m) - 1 };
  }, [value]);

  const [year, setYear] = React.useState<number>(
    parsed?.year ?? new Date().getFullYear()
  );

  React.useEffect(() => {
    if (parsed?.year) setYear(parsed.year);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const formattedLabel = React.useMemo(() => {
    if (!parsed) return "";
    return `${MONTHS[parsed.monthIndex]} ${parsed.year}`;
  }, [parsed]);

  const handleSelect = (monthIndex: number) => {
    const mm = String(monthIndex + 1).padStart(2, "0");
    const formatted = `${year}-${mm}`;
    onChange?.(formatted);
    setOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className={cn("relative w-full", className)}>
        <button
          ref={buttonRef}
          type="button"
          aria-haspopup="dialog"
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
          <span className={cn(!formattedLabel && "text-muted-foreground")}>
            {formattedLabel || placeholder}
          </span>

          <IoChevronDown
            aria-hidden
            className={cn("size-5 text-muted-foreground transition-transform", open && "rotate-180")}
          />
        </button>

        <div
          className={cn(
            "absolute left-0 right-0 z-50 mt-2 origin-top overflow-hidden rounded-md border border-input bg-popover text-popover-foreground shadow-md",
            open ? "animate-fadeIn animate-duration-200" : "pointer-events-none hidden"
          )}
          role="dialog"
          aria-label="Choose month"
        >
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                className="p-2 rounded-md hover:bg-accent cursor-pointer"
                onClick={() => setYear((y) => y - 1)}
                aria-label="Previous year"
              >
                <IoChevronBack className="size-5" />
              </button>
              <div className="text-sm font-medium">{year}</div>
              <button
                type="button"
                className="p-2 rounded-md hover:bg-accent cursor-pointer"
                onClick={() => setYear((y) => y + 1)}
                aria-label="Next year"
              >
                <IoChevronForward className="size-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {MONTHS.map((m, idx) => {
                const isActive = parsed?.year === year && parsed?.monthIndex === idx;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    className={cn(
                      "px-3 py-2 text-sm rounded-md cursor-pointer text-left",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive && "bg-accent/70 text-accent-foreground"
                    )}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      </div>
    </ClickAwayListener>
  );
}

export type { MonthPickerProps };


