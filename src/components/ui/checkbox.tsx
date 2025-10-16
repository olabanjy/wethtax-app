import { cn } from "@/lib/utils";

type CheckboxProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  error?: string;
};

export function Checkbox({
  checked,
  onCheckedChange,
  className,
  children,
  name,
  required,
  disabled,
  error,
}: CheckboxProps) {
  return (
    <div>
      <label className={cn("flex items-center gap-3 text-sm", className)}>
        <input
          type="checkbox"
          name={name}
          required={required}
          disabled={disabled}
          checked={checked}
          aria-invalid={!!error}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className={cn(
            "size-4 rounded-[4px] border border-[#8a8a8a] bg-transparent cursor-pointer",
            "accent-[#5D5EBA] disabled:opacity-50 disabled:cursor-not-allowed",
            "outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border-ring",
            error && "border-destructive"
          )}
        />

        <span className="text-[#717171]">{children}</span>
      </label>
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}

export type { CheckboxProps };
