import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@/store";
import { useFetch } from "@/hooks/use-fetch";
import { capitalize } from "@/lib/utils";

const schema = z.object({
  state: z.string().min(1, "State is required"),
});

const SelectState = () => {
  const { setTenantName } = useStore();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ state: string }>({
    defaultValues: { state: "" },
    resolver: zodResolver(schema),
  });

  const { data, isLoading } = useFetch<{ name: string }[]>("/tenants/all", {
    useTenant: false,
    version: false,
    useAuth: false,
    hideToast: "success",
    errorMessage: "Failed to fetch tenants",
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    const { protocol, host } = window.location;
    setTenantName(data.state);
    window.location.href = `${protocol}//${data.state}.${host}/login`;
  };

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
                options={
                  data?.map((tenant) => ({
                    value: tenant.name,
                    label: capitalize(tenant.name),
                  })) ?? []
                }
                placeholder="Select State"
                value={value}
                onChange={onChange}
                aria-invalid={!!errors.state}
                error={errors.state?.message}
              />
            )}
          />
        </div>

        <Button
          loading={isLoading}
          className="w-full"
          size="xl"
          type="submit"
          disabled={!isValid}
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default SelectState;
