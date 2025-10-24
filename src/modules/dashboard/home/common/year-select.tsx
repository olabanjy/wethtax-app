import clsx from "clsx";
import { Select } from "@/components/ui/select";

type YearSelectProps = {
  label?: string;
  year: number;
  onChange: (year: number) => void;
  startYear?: number;
  endYear?: number;
  className?: string;
  labelClassName?: string;
};

const YearSelect = ({
  label = "Year in view:",
  year,
  onChange,
  startYear,
  endYear,
  className,
  labelClassName,
}: YearSelectProps) => {
  const currentYear = new Date().getFullYear();
  const lastYear = endYear ?? currentYear;
  const firstYear = startYear ?? lastYear - 9;
  const years = Array.from(
    { length: lastYear - firstYear + 1 },
    (_, i) => firstYear + i
  );

  return (
    <div className={clsx("flex items-center gap-3", className)}>
      {label ? (
        <span className={clsx("text-sm whitespace-nowrap", labelClassName)}>
          {label}
        </span>
      ) : null}

      <Select
        className="w-auto min-w-[92px]"
        chevronClassName={className}
        size="!h-9"
        options={years
          .slice()
          .reverse()
          .map((y) => ({ label: String(y), value: String(y) }))}
        value={String(year)}
        onChange={(val) => onChange(Number(val))}
      />
    </div>
  );
};

export default YearSelect;
