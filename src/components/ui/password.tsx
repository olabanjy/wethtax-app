import * as React from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import { cn } from "@/lib/utils";
import clsx from "clsx";

type PasswordInputProps = React.ComponentProps<"input"> & {
  showLabel?: string;
  hideLabel?: string;
  error?: string;
};

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      className,
      showLabel = "Show password",
      hideLabel = "Hide password",
      id,
      placeholder,
      error,
      ...props
    },
    ref
  ) {
    const [visible, setVisible] = React.useState(false);

    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div>
        <div className="relative">
          <input
            ref={ref}
            type={visible ? "text" : "password"}
            data-slot="input"
            className={cn(
              "peer file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-14 w-full min-w-0",
              "rounded-md border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0",
              "file:bg-transparent file:text-sm disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-[#414141] focus-visible:ring-ring/50 focus-visible:ring-[1px] pr-10",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              className
            )}
            placeholder=" "
            id={inputId}
            aria-invalid={!!error}
            {...props}
          />

          <label
            htmlFor={inputId}
            className={cn(
              "pointer-events-none bg-white absolute left-3 -top-2 rounded-sm px-1 text-xs text-foreground transition-all",
              "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground",
              "peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-foreground",
              "peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
            )}
          >
            {placeholder}
          </label>

          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? hideLabel : showLabel}
            className={clsx(
              "absolute inset-y-0 right-0 mr-3 grid size-7 place-items-center",
              "rounded-md text-muted-foreground hover:text-accent-foreground",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "top-1/2 -translate-y-1/2 cursor-pointer"
            )}
            tabIndex={0}
          >
            {!visible ? (
              <IoEyeOffOutline className="size-5" aria-hidden />
            ) : (
              <IoEyeOutline className="size-5" aria-hidden />
            )}
          </button>
        </div>
        {error && (
          <p className="mt-1 text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

export type { PasswordInputProps };
