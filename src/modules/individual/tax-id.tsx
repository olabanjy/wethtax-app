import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";

export type TaxIdValues = { taxId: string };

export function TaxIdStep({
  defaultValues,
  onSubmit,
  onBack,
  loading = false,
}: {
  defaultValues?: Partial<TaxIdValues>;
  onSubmit: (v: TaxIdValues) => void;
  onBack: () => void;
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
        rules={{ required: "Enter your State IRS Taxpayer ID Number" }}
        render={({ field }) => (
          <Input
            placeholder="Enter your State IRS Taxpayer ID Number"
            error={errors.taxId?.message}
            {...field}
          />
        )}
      />

      <div className="flex items-center gap-4 justify-center">
        <Button variant="outline" size="xl" type="button" onClick={onBack}>
          Back
        </Button>

        <Button size="xl" type="submit" disabled={!isValid}>
          {loading ? "Saving..." : "Save & Continue"}
        </Button>
      </div>
    </form>
  );
}
