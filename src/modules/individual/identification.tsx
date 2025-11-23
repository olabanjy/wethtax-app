import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { IDENTIFICATION_TYPES } from "@/constants/profile";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";

export type IdentificationValues = {
  idType: string;
  idNumber: string;
};

export function IdentificationStep({
  defaultValues,
  onSubmit,
  loading,
}: {
  defaultValues?: Partial<IdentificationValues>;
  onSubmit: (values: IdentificationValues) => void;
  loading?: boolean;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IdentificationValues>({
    mode: "onChange",
    defaultValues: { idType: "", idNumber: "", ...defaultValues },
  });

  return (
    <form
      className={clsx(
        "w-full max-w-[640px] mx-auto space-y-6 bg-white rounded-[10px]",
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
        name="idType"
        rules={{ required: "Select identification type" }}
        render={({ field: { value, onChange } }) => (
          <Select
            options={IDENTIFICATION_TYPES}
            placeholder="Identification Type"
            value={value}
            onChange={onChange}
            error={errors.idType?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="idNumber"
        rules={{
          required: "Enter identification number",
          minLength: 11,
          maxLength: 11,
          pattern: {
            value: /^[0-9]+$/,
            message: "Enter a valid identification number (11 digits)",
          },
        }}
        render={({ field }) => (
          <Input
            placeholder="Identification Number"
            error={errors.idNumber?.message}
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
