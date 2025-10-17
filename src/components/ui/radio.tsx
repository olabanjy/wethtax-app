import { cn } from "@/lib/utils";

type RadioProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  value?: string;
  error?: string;
};

export function Radio({
  checked,
  onCheckedChange,
  className,
  children,
  name,
  required,
  disabled,
  value,
  error,
}: RadioProps) {
  return (
    <div>
      <label className={cn("flex items-center gap-3 text-sm", className)}>
        <input
          type="radio"
          name={name}
          required={required}
          disabled={disabled}
          checked={checked}
          value={value}
          aria-invalid={!!error}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className={cn(
            "size-5 rounded-full border border-[#8a8a8a] bg-transparent cursor-pointer",
            "accent-[#5D5EBA] disabled:opacity-50 disabled:cursor-not-allowed",
            "outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border-ring",
            error && "border-destructive"
          )}
        />

        <span className="text-[#414141]">{children}</span>
      </label>

      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}

export type { RadioProps };
