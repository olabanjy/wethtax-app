import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";

export type BusinessIdentificationValues = {
  regNo: string;
};

export function BusinessIdentificationStep({
  defaultValues,
  onSubmit,
  loading,
}: {
  defaultValues?: Partial<BusinessIdentificationValues>;
  onSubmit: (values: BusinessIdentificationValues) => void | Promise<void>;
  loading?: boolean;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BusinessIdentificationValues>({
    mode: "onChange",
    defaultValues: { regNo: "", ...defaultValues },
  });

  return (
    <form
      className={clsx(
        "w-full max-w-[650px] mx-auto space-y-6 bg-white rounded-[10px]",
        "px-20 py-14 border border-border"
      )}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <p className="font-[500] text-2xl leading-[36px] text-primary">
        Identification
      </p>

      <Controller
        control={control}
        name="regNo"
        rules={{ required: "Enter CAC ID Number" }}
        render={({ field }) => (
          <Input
            placeholder="CAC ID Number"
            error={errors.regNo?.message}
            {...field}
          />
        )}
      />

      <Button
        className="w-full"
        size="xl"
        type="submit"
        disabled={!isValid || loading}
      >
        {loading ? "Verifying..." : "Save & Continue"}
      </Button>
    </form>
  );
}
