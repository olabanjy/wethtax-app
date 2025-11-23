import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  error?: string;
  labelClass?: string;
  label?: string;
  isAmount?: boolean;
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "decimal", // Default, but can be 'currency', 'percent', etc.
  minimumFractionDigits: 2, // Ensures at least 2 decimal places
  maximumFractionDigits: 2, // Ensures at most 2 decimal places
});

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    labelClass,
    type,
    id,
    placeholder,
    error,
    label,
    onFocus,
    onBlur,
    onChange,
    isAmount,
    ...props
  },
  ref
) {
  const [focused, setIsFocused] = React.useState(false);
  const [value, setValue] = React.useState(props.value);
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  const isFocused = focused || Boolean(value);

  const shouldFormatAmmount = isAmount && value && !focused && !isNaN(Number(value));

  const inputType = React.useMemo(() => {
    if (type === "date") {
      return isFocused ? "date" : "text";
    }

    return type;
  }, [type, isFocused]);

  return (
    <div>
      {label && <p className="font-medium text-[#414141] mb-2">{label}</p>}
      <fieldset
        className={cn("relative h-14 border-input rounded border", {
          "border-[#414141] h-[4.1rem] -mt-2.5": isFocused,
        })}
      >
        {isFocused && (
          <legend className="invisible ml-2">
            <span>{placeholder}</span>
          </legend>
        )}
        <input
          ref={ref}
          id={inputId}
          type={inputType}
          onFocus={(e) => {
            onFocus?.(e);
            setIsFocused(true);
          }}
          onBlur={(e) => {
            onBlur?.(e);
            setIsFocused(false);
          }}
          data-slot="input"
          placeholder=" "
          aria-invalid={!!error}
          value={
            shouldFormatAmmount ? formatter.format(Number(value)) : value
          }
          className={cn(
            "peer file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-full w-full min-w-0",
            " bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0",
            "file:bg-transparent file:text-sm disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            type === "date" && "cursor-pointer",
            className
          )}
          onChange={(e) => {
            const v = e.target.value
            const formatValue = isAmount ? v.replace(/,/g, '') : v
            if (isAmount && isNaN(Number(formatValue))) return
            setValue(formatValue);
            onChange?.({ ...e, target: { ...e.target, value: formatValue } });
          }}
          {...props}
        />

        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none absolute left-3 bg-inherit rounded-sm px-1 text-xs text-foreground transition-all",
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground",
            "peer-focus:-top-5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-foreground",
            "peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs",
            { "-top-10": Boolean(value) },
            labelClass
          )}
        >
          {placeholder}
        </label>
      </fieldset>

      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
});

export { Input };
