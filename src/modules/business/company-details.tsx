import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { STATES } from "@/constant/states";
import { TAX_STATIONS } from "@/constant/profile";
import { getLcdasFor, getLgasForState } from "@/constant/locations";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";

export type CompanyDetailsValues = {
  // display-only values carried from step 1
  regNo?: string;
  name?: string;
  phone: string;
  email: string;
  businessType: string;
  address: string;
  state: string;
  lga: string;
  lcda: string;
  taxStation: string;
  placeOfBusiness: string;
  numEmployees?: number;
  numDirectors?: number;
};

export function CompanyDetailsStep({
  defaultValues,
  onSubmit,
  loading,
}: {
  defaultValues?: Partial<CompanyDetailsValues>;
  onSubmit: (values: CompanyDetailsValues) => void;
  loading?: boolean;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<CompanyDetailsValues>({
    mode: "onChange",
    defaultValues: {
      regNo: defaultValues?.regNo ?? "",
      name: defaultValues?.name ?? "",
      phone: "",
      email: "",
      businessType: "",
      address: "",
      state: "",
      lga: "",
      lcda: "",
      taxStation: "",
      placeOfBusiness: "",
      numEmployees: undefined,
      numDirectors: undefined,
      ...defaultValues,
    },
  });

  const selectedState = watch("state");
  const selectedLga = watch("lga");

  return (
    <form
      className={clsx(
        "w-full max-w-[900px] mx-auto space-y-6 bg-white rounded-[10px]",
        "px-20 py-14 border border-border"
      )}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <p className="font-[500] text-2xl leading-[36px] text-primary">
        Company Details
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Controller
          control={control}
          name="regNo"
          render={({ field }) => (
            <Input placeholder="Company Reg No" disabled readOnly {...field} />
          )}
        />

        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input placeholder="Company Name" {...field} />
          )}
        />

        <Controller
          control={control}
          name="businessType"
          render={({ field }) => (
            <Input placeholder="Business Type" {...field} />
          )}
        />
      </div>

      <div className="w-full pb-3 border-b border-border">
        <p className="font-[500] text-lg leading-[27px] text-[#414141]">
          Contact Details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Controller
          control={control}
          name="phone"
          rules={{ required: "Phone number is required" }}
          render={({ field }) => (
            <Input
              placeholder="Phone Number"
              error={errors.phone?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <Input
              type="email"
              placeholder="Email Address"
              error={errors.email?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="placeOfBusiness"
          render={({ field }) => (
            <Input placeholder="Principal Place of Business" {...field} />
          )}
        />

        <div className="md:col-span-2">
          <Controller
            control={control}
            name="address"
            rules={{ required: "Current company address is required" }}
            render={({ field }) => (
              <Input
                placeholder="Current Company Address"
                error={errors.address?.message}
                {...field}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="state"
          rules={{ required: "Select state of residence" }}
          render={({ field: { value, onChange } }) => (
            <Select
              options={STATES}
              placeholder="State of Residence"
              value={value}
              onChange={(v) => {
                onChange(v);
                setValue("lga", "");
                setValue("lcda", "");
              }}
              error={(errors as any).state?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="lga"
          rules={{ required: "Select LGA" }}
          render={({ field: { value, onChange } }) => (
            <Select
              options={getLgasForState(selectedState)}
              placeholder="Select LGA"
              value={value}
              onChange={(v) => {
                onChange(v);
                setValue("lcda", "");
              }}
              error={(errors as any).lga?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="lcda"
          rules={{ required: "Select LCDA" }}
          render={({ field: { value, onChange } }) => (
            <Select
              options={getLcdasFor(selectedState, selectedLga)}
              placeholder="Select LCDA"
              value={value}
              onChange={onChange}
              error={(errors as any).lcda?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="taxStation"
          render={({ field: { value, onChange } }) => (
            <Select
              options={TAX_STATIONS}
              placeholder="Tax Station"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="numEmployees"
          render={({ field }) => (
            <Input
              type="number"
              placeholder="No. of Employees"
              min={0}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="numDirectors"
          render={({ field }) => (
            <Input
              type="number"
              placeholder="No. of Directors"
              min={0}
              {...field}
            />
          )}
        />
      </div>

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
