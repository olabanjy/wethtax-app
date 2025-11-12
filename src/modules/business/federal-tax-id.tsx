import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export type FederalTaxIdValues = { firsTaxId: string };

export function FederalTaxIdStep({
  defaultValues,
  onSubmit,
  loading,
}: {
  defaultValues?: Partial<FederalTaxIdValues>;
  onSubmit: (values: FederalTaxIdValues) => void | Promise<void>;
  loading?: boolean;
}) {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FederalTaxIdValues>({
    mode: "onChange",
    defaultValues: { firsTaxId: "", ...defaultValues },
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
          FIRS Tax ID Number
        </h2>

        <p className="text-[20px] text-primary-grey">
          Let's set up your Revenue Services
        </p>
      </div>

      <Controller
        control={control}
        name="firsTaxId"
        render={({ field }) => (
          <Input placeholder="Enter your FIRS Taxpayer ID Number" {...field} />
        )}
      />

      <div className="w-full grid grid-cols-3 items-center gap-4 justify-center">
        <Button
          className="w-full col-span-1"
          size="xl"
          type="button"
          variant="outline"
          onClick={() => navigate("/company")}
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
