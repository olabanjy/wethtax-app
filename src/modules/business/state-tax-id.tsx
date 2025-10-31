import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";

export type StateTaxIdValues = { stateTaxId: string };

export function StateTaxIdStep({
  defaultValues,
  onSubmit,
  loading,
  onSkip,
}: {
  defaultValues?: Partial<StateTaxIdValues>;
  onSubmit: (values: StateTaxIdValues) => void | Promise<void>;
  loading?: boolean;
  onSkip?: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<StateTaxIdValues>({
    mode: "onChange",
    defaultValues: { stateTaxId: "", ...defaultValues },
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
          State Tax ID Number
        </h2>

        <p className="text-[20px] text-primary-grey">
          Let's set up your Revenue Services
        </p>
      </div>

      <Controller
        control={control}
        name="stateTaxId"
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
            error={errors.stateTaxId?.message}
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

      <div className="w-full gap-4 justify-end grid grid-cols-3">
        <Button
          variant="outline"
          size="xl"
          type="button"
          onClick={onSkip}
          className="w-full col-span-1"
        >
          Skip
        </Button>

        <Button
          className="w-full col-span-2"
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
