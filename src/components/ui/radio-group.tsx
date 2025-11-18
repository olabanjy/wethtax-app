import { cn } from "@/lib/utils";
import { Radio } from "./radio";

type RadioGroupOption = {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
};

type RadioGroupProps = {
  name?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: RadioGroupOption[];
  className?: string;
  error?: string;
  direction?: "row" | "col";
  label?: string;
};

export function RadioGroup({
  name,
  value,
  onValueChange,
  options,
  className,
  error,
  direction = "row",
  label,
}: RadioGroupProps) {
  return (
    <div className="space-y-4">
      <p className="text-[#121212]">{label}</p>

      <div className={cn("space-y-1", className)}>
        <div
          className={cn(
            "gap-10",
            direction === "row" ? "flex items-center" : "flex flex-col"
          )}
        >
          {options.map((opt) => (
            <Radio
              key={opt.value}
              name={name}
              checked={value === opt.value}
              disabled={opt.disabled}
              onCheckedChange={(checked) => checked && onValueChange(opt.value)}
              error={error}
            >
              {opt.label}
            </Radio>
          ))}
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}

export type { RadioGroupProps, RadioGroupOption };
