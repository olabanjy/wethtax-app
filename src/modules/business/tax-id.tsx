import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";

export type BusinessTaxIdValues = { stateTaxId: string; firsTaxId: string };

export function BusinessTaxIdStep({
  defaultValues,
  onSubmit,
  onBack,
  loading,
}: {
  defaultValues?: Partial<BusinessTaxIdValues>;
  onSubmit: (v: BusinessTaxIdValues) => void | Promise<void>;
  onBack: () => void;
  loading?: boolean;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BusinessTaxIdValues>({
    mode: "onChange",
    defaultValues: { stateTaxId: "", firsTaxId: "", ...defaultValues },
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
          Let's set up your Revenue Services
        </p>
      </div>

      <Controller
        control={control}
        name="stateTaxId"
        rules={{ required: "Enter your State IRS Taxpayer ID Number" }}
        render={({ field }) => (
          <Input
            placeholder="Enter your State IRS Taxpayer ID Number"
            error={errors.stateTaxId?.message}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="firsTaxId"
        render={({ field }) => (
          <Input placeholder="Enter your FIRS Taxpayer ID Number" {...field} />
        )}
      />

      <div className="flex items-center gap-4 justify-center">
        <Button variant="outline" size="xl" type="button" onClick={onBack}>
          Back
        </Button>

        <Button size="xl" type="submit" disabled={!isValid || loading}>
          {loading ? "Submitting..." : "Save & Continue"}
        </Button>
      </div>
    </form>
  );
}
