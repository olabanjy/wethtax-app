import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  error?: string;
  labelClass?: string;
  label?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, labelClass, type, id, placeholder, error, label, ...props },
  ref
) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div>
      {label && (
        <p className="font-medium text-[#414141] mb-2">{label}</p>
      )}

      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          type={type}
          data-slot="input"
          placeholder=" "
          aria-invalid={!!error}
          className={cn(
            "peer file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-14 w-full min-w-0",
            "rounded-md border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0",
            "file:bg-transparent file:text-sm disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-[#414141] focus-visible:ring-ring/50 focus-visible:ring-[1px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            type === "date" && "cursor-pointer",
            className
          )}
          {...props}
        />

        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none bg-white absolute left-3 -top-2 rounded-sm px-1 text-xs text-foreground transition-all",
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground",
            "peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-foreground",
            "peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs",
            labelClass
          )}
        >
          {placeholder}
        </label>
      </div>

      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
});

export { Input };
