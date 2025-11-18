import * as React from "react";
import ClickAwayListener from "react-click-away-listener";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  value?: string; // ISO format: YYYY-MM-DD
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  "aria-invalid"?: boolean | "true" | "false";
  error?: string;
  title?: string;
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

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function parseISO(iso?: string): Date | null {
  if (!iso) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const [, y, mo, d] = m;
  const dt = new Date(Number(y), Number(mo) - 1, Number(d));
  return isNaN(dt.getTime()) ? null : dt;
}

function formatISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatReadable(date: Date): string {
  const month = MONTHS[date.getMonth()];
  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select Date",
  className,
  disabled,
  "aria-invalid": ariaInvalid,
  error,
  title,
}: DatePickerProps) {
  const selected = React.useMemo(() => parseISO(value), [value]);

  const [open, setOpen] = React.useState(false);
  const [viewYear, setViewYear] = React.useState<number>(
    selected?.getFullYear() ?? new Date().getFullYear()
  );
  const [viewMonth, setViewMonth] = React.useState<number>(
    selected?.getMonth() ?? new Date().getMonth()
  );
  const [temp, setTemp] = React.useState<Date | null>(selected ?? null);

  React.useEffect(() => {
    if (selected) {
      setViewYear(selected.getFullYear());
      setViewMonth(selected.getMonth());
      setTemp(selected);
    }
  }, [selected]);

  const label = selected ? formatReadable(selected) : "";

  const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0..6
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const onPrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const onNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const apply = () => {
    if (temp) onChange?.(formatISO(temp));
    setOpen(false);
  };

  const cancel = () => {
    setTemp(selected ?? null);
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className={cn("relative w-full", className)}>
        {title && <p className="font-medium text-[#414141] mb-2">{title}</p>}

        <button
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
          <span className={cn(!label && "text-muted-foreground")}>
            {label || placeholder}
          </span>

          <Calendar className="size-5 text-muted-foreground" />
        </button>

        <div
          className={cn(
            "w-[305px] absolute left-0 right-0 z-50 mt-2 origin-top overflow-hidden rounded-md border border-input bg-popover text-popover-foreground shadow-md",
            open
              ? "animate-fadeIn animate-duration-200"
              : "pointer-events-none hidden"
          )}
          role="dialog"
          aria-label="Date picker"
        >
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                className="p-2 rounded-md hover:bg-accent cursor-pointer"
                onClick={onPrev}
                aria-label="Previous month"
              >
                <IoChevronBack className="size-5" />
              </button>
              <div className="text-base font-medium">
                {MONTHS[viewMonth]} {viewYear}
              </div>
              <button
                type="button"
                className="p-2 rounded-md hover:bg-accent cursor-pointer"
                onClick={onNext}
                aria-label="Next month"
              >
                <IoChevronForward className="size-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-xs text-muted-foreground mb-2 px-1">
              {WEEKDAYS.map((d) => (
                <div key={d} className="text-center">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 px-1">
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const colStart =
                  day === 1 ? { gridColumnStart: firstDay + 1 } : undefined;
                const isActive =
                  temp &&
                  temp.getFullYear() === viewYear &&
                  temp.getMonth() === viewMonth &&
                  temp.getDate() === day;
                return (
                  <button
                    key={day}
                    type="button"
                    style={colStart}
                    onClick={() => setTemp(new Date(viewYear, viewMonth, day))}
                    className={cn(
                      "h-9 w-9 mx-auto rounded-full text-sm cursor-pointer",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive && "bg-green-600 text-white"
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-3 border-t mt-3 pt-3">
              <button
                type="button"
                className="h-10 px-4 rounded-md border cursor-pointer hover:bg-accent"
                onClick={cancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="h-10 px-5 rounded-md bg-foreground text-background cursor-pointer hover:opacity-90"
                onClick={apply}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      </div>
    </ClickAwayListener>
  );
}

export type { DatePickerProps };
