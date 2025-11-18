import { cn } from "@/lib/utils";
import clsx from "clsx";
import { useId } from "react";

export type TabItem = {
  label: string;
  value: string;
};

export type TabsProps = {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function Tabs({ items, value, onChange, className }: TabsProps) {
  const baseId = useId();

  return (
    <div
      className={cn("w-full border-b border-[#D0D0D0]", className)}
      role="tablist"
      aria-label="Tabs"
    >
      <div className="flex items-center gap-10">
        {items.map((item) => {
          const isActive = item.value === value;

          return (
            <button
              key={`${baseId}-${item.value}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${item.value}`}
              className={clsx(
                "relative px-3 pb-4 cursor-pointer",
                isActive ? "text-[#414141] font-semibold" : "text-[#898989]"
              )}
              onClick={() => onChange(item.value)}
            >
              {item.label}

              <span
                className={clsx(
                  "absolute -bottom-[1px] left-0 h-[3px] rounded-full",
                  isActive ? "w-full bg-[#121212]" : "w-0"
                )}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
