import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";

export type TaxIdValues = { taxId: string };

export function TaxIdStep({
  defaultValues,
  onSubmit,
  loading = false,
}: {
  defaultValues?: Partial<TaxIdValues>;
  onSubmit: (v: TaxIdValues) => void;
  loading?: boolean;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TaxIdValues>({
    mode: "onChange",
    defaultValues: { taxId: "", ...defaultValues },
  });

  return (
    <form
      className={clsx(
        "w-full max-w-[645px] mx-auto space-y-6 bg-white rounded-[10px]",
        "px-20 py-14 border border-border"
      )}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className={clsx("text-center pb-3 border-b border-border")}>
        <h2 className="text-2xl font-[500] leading-[36px] text-primary mb-2">
          Tax ID Number
        </h2>

        <p className="text-[20px] text-primary-grey">
          Let's set up your Lagos Inland Revenue Service
        </p>
      </div>

      <Controller
        control={control}
        name="taxId"
        rules={{
          required: "Enter your State IRS Taxpayer ID Number",
          pattern: {
            value: /^N-\d{8}$/,
            message: "Enter a valid Taxpayer ID in the format N-XXXXXXXX",
          },
        }}
        render={({ field: { value, onChange, ...rest } }) => (
          <Input
            placeholder="N-XXXXXXXX"
            error={errors.taxId?.message}
            value={value ?? ""}
            maxLength={10}
            inputMode="numeric"
            onChange={(e) => {
              const digits = e.target.value.replace(/[^0-9]/g, "").slice(0, 8);
              onChange(digits ? `N-${digits}` : "N-");
            }}
            onFocus={() => {
              if (!value) onChange("N-");
            }}
            {...rest}
          />
        )}
      />

      <div
        className={clsx(
          "w-full flex items-center gap-4 justify-end",
          "pt-5 border-t border-border"
        )}
      >
        <Button
          className="w-full"
          size="xl"
          type="submit"
          disabled={!isValid || loading}
        >
          {loading ? "Saving..." : "Save & Continue"}
        </Button>
      </div>
    </form>
  );
}
