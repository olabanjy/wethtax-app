import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { STATES } from "@/constant/states";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";

const SelectState = ({ handleContinue }: { handleContinue: () => void }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ state: string }>({
    defaultValues: { state: "" },
  });

  const onSubmit = () => handleContinue();

  return (
    <div
      className={clsx(
        "w-full max-w-[475px] flex flex-col items-center gap-8",
        "mx-auto py-10"
      )}
    >
      <img src="/assets/png/logo.png" alt="Wethtax" width={136} height={37} />

      <div>
        <h1
          className={clsx(
            "text-[22px] font-[500] leading-[33px] text-primary",
            "text-center my-2"
          )}
        >
          Select State Institution
        </h1>

        <p className={clsx("leading-[21px] text-primary-grey")}>
          Please select the state you reside or operate your business in{" "}
        </p>
      </div>

      <form
        className="w-full space-y-6"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <Controller
            control={control}
            name="state"
            rules={{ required: "Please select a state" }}
            render={({ field: { value, onChange } }) => (
              <Select
                options={STATES}
                placeholder="Select State"
                value={value}
                onChange={onChange}
                aria-invalid={!!errors.state}
                error={errors.state?.message}
              />
            )}
          />
        </div>

        <Button className="w-full" size="xl" type="submit" disabled={!isValid}>
          Continue
        </Button>
      </form>
    </div>
  );
};

export default SelectState;
