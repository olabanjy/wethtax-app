import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { STATES } from "@/constant/states";
import { Radio } from "@/components/ui/radio";
import { getLgasForState, getLcdasFor } from "@/constant/locations";
import {
  TITLES,
  MARITAL_STATUSES,
  GENDERS,
  EMPLOYMENT_STATUSES,
  TAX_STATIONS,
} from "@/constant/profile";
import { Controller, useForm } from "react-hook-form";
import clsx from "clsx";

export type PersonalDetailsValues = {
  firstName: string;
  lastName: string;
  otherName: string;
  dob?: string;
  title: string;
  maritalStatus: string;
  placeOfBirth: string;
  gender: string;
  stateOfOrigin: string;
  stateOfResidence: string;
  lga: string;
  lcda: string;
  phone: string;
  email: string;
  lassra?: string;
  address: string;
  isPublicServant?: boolean;
  employmentStatus: string;
  occupation: string;
  nationality: string;
  businessType: string;
  taxStation: string;
};

export function PersonalDetailsStep({
  defaultValues,
  onSubmit,
  onBack,
}: {
  defaultValues?: Partial<PersonalDetailsValues>;
  onSubmit: (values: PersonalDetailsValues) => void;
  onBack: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<PersonalDetailsValues>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      otherName: "",
      dob: "",
      title: "",
      maritalStatus: "",
      placeOfBirth: "",
      gender: "",
      stateOfOrigin: "",
      stateOfResidence: "",
      lga: "",
      lcda: "",
      phone: "",
      email: "",
      lassra: "",
      address: "",
      isPublicServant: undefined,
      employmentStatus: "",
      occupation: "",
      nationality: "",
      businessType: "",
      taxStation: "",
      ...defaultValues,
    },
  });

  const stateOfResidence = watch("stateOfResidence");
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
        Personal Details
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Controller
          control={control}
          name="firstName"
          rules={{ required: "First name is required" }}
          render={({ field }) => (
            <Input
              placeholder="First Name"
              error={errors.firstName?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          rules={{ required: "Surname is required" }}
          render={({ field }) => (
            <Input
              placeholder="Surname"
              error={errors.lastName?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="otherName"
          render={({ field }) => <Input placeholder="Other Name" {...field} />}
        />

        <Controller
          control={control}
          name="dob"
          rules={{ required: "Date of Birth is required" }}
          render={({ field }) => (
            <Input
              type="date"
              placeholder="Date of Birth"
              error={(errors as any).dob?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="title"
          rules={{ required: "Select title" }}
          render={({ field: { value, onChange } }) => (
            <Select
              options={TITLES}
              placeholder="Title"
              value={value}
              onChange={onChange}
              error={(errors as any).title?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="maritalStatus"
          rules={{ required: "Select marital status" }}
          render={({ field: { value, onChange } }) => (
            <Select
              options={MARITAL_STATUSES}
              placeholder="Marital Status"
              value={value}
              onChange={onChange}
              error={(errors as any).maritalStatus?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="placeOfBirth"
          render={({ field }) => (
            <Input placeholder="Place of Birth" {...field} />
          )}
        />

        <Controller
          control={control}
          name="gender"
          rules={{ required: "Select gender" }}
          render={({ field: { value, onChange } }) => (
            <Select
              options={GENDERS}
              placeholder="Gender"
              value={value}
              onChange={onChange}
              error={(errors as any).gender?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="stateOfOrigin"
          rules={{ required: "Select state of origin" }}
          render={({ field: { value, onChange } }) => (
            <Select
              options={STATES}
              placeholder="State of Origin"
              value={value}
              onChange={onChange}
              error={(errors as any).stateOfOrigin?.message}
            />
          )}
        />
      </div>

      <div className="w-full pb-3 border-b border-border">
        <p className="font-[500] text-lg leading-[27px] text-[#414141]">
          Contact Details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Controller
          control={control}
          name="phone"
          rules={{ required: "Phone number is required" }}
          render={({ field }) => (
            <Input
              type="tel"
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
          name="lassra"
          render={({ field }) => <Input placeholder="LASSRA No" {...field} />}
        />

        <div className="w-full col-span-3">
          <Controller
            control={control}
            name="address"
            rules={{ required: "Current address is required" }}
            render={({ field }) => (
              <Input
                placeholder="Current Address"
                error={errors.address?.message}
                {...field}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="stateOfResidence"
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
              error={(errors as any).stateOfResidence?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="lga"
          rules={{ required: "Select LGA" }}
          render={({ field: { value, onChange } }) => (
            <Select
              options={getLgasForState(stateOfResidence)}
              placeholder="LGA"
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
              options={getLcdasFor(stateOfResidence, selectedLga)}
              placeholder="LCDA"
              value={value}
              onChange={onChange}
              error={(errors as any).lcda?.message}
            />
          )}
        />
      </div>

      <div className="w-full py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <p className="font-[500] text-lg leading-[27px] text-[#414141]">
            Occupation Details
          </p>

          <div className="flex items-center gap-6">
            <span className="text-lg leading-[27px] text-[#414141]">
              Are you a public servant?
            </span>

            <Controller
              control={control}
              name="isPublicServant"
              render={({ field: { value, onChange, name } }) => (
                <div className="flex items-center gap-4">
                  <Radio
                    name={name}
                    checked={value === true}
                    onCheckedChange={() => onChange(true)}
                  >
                    Yes
                  </Radio>

                  <Radio
                    name={name}
                    checked={value === false}
                    onCheckedChange={() => onChange(false)}
                  >
                    No
                  </Radio>
                </div>
              )}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Controller
          control={control}
          name="employmentStatus"
          render={({ field: { value, onChange } }) => (
            <Select
              options={EMPLOYMENT_STATUSES}
              placeholder="Employment Status"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="occupation"
          render={({ field }) => <Input placeholder="Occupation" {...field} />}
        />

        <Controller
          control={control}
          name="nationality"
          render={({ field }) => <Input placeholder="Nationality" {...field} />}
        />

        <Controller
          control={control}
          name="businessType"
          render={({ field }) => (
            <Input placeholder="Business Type" {...field} />
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
      </div>

      <div
        className={clsx(
          "w-full flex items-center gap-4 justify-end",
          "pt-5 border-t border-border"
        )}
      >
        <Button variant="outline" size="xl" type="button" onClick={onBack}>
          Back
        </Button>

        <Button size="xl" type="submit" disabled={!isValid}>
          Save & Continue
        </Button>
      </div>
    </form>
  );
}
