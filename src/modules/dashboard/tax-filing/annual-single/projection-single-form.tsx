import { useState } from "react";
import {
  Controller,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  LucideChevronDown,
  LucideTrash,
} from "lucide-react";
import clsx from "clsx";

const NATIONALITIES = [
  { label: "Nigerian", value: "nigeria" },
  { label: "Ghanaian", value: "ghana" },
  { label: "Other", value: "other" },
];

export type ProjectionFiling = {
  lastName: string;
  firstName: string;
  middleName: string;
  designation: string;
  nationality: string;
  grossIncome: string;
  taxpayerId: string;
  staffPhoneNumber: string;
  staffEmailAddress: string;
};

export type ProjectionFilingFormValues = {
  filings: ProjectionFiling[];
};

export default function ProjectionSingleForm({
  index,
  control,
  register,
  canDelete,
  onDelete,
}: {
  index: number;
  control: Control<ProjectionFilingFormValues>;
  register: UseFormRegister<ProjectionFilingFormValues>;
  canDelete?: boolean;
  onDelete?: () => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={clsx(
        "w-full py-4 border-[#B8B8B8] flex flex-col gap-4",
        canDelete ? "border-y-[0.5px]" : "border-y-1"
      )}
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="w-[90%] flex items-center gap-4 cursor-pointer"
          aria-expanded={open}
          onClick={() => setOpen((p) => !p)}
        >
          <LucideChevronDown
            color="#7879C5"
            size={24}
            className={open ? "" : "rotate-[-90deg] transition-transform"}
          />

          <p className="text-[#5D5EBA] text-lg font-[500]">
            Projection Return Filing {index + 1}
          </p>
        </button>

        {canDelete && onDelete && (
          <button
            type="button"
            className="cursor-pointer"
            aria-label="Delete filing"
            onClick={onDelete}
          >
            <LucideTrash size={20} color="#AE111C" />
          </button>
        )}
      </div>

      <div
        className={open ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "hidden"}
      >
        <Input
          label="Last Name"
          placeholder="Enter Last Name"
          {...register(`filings.${index}.lastName`)}
          labelClass="!bg-[#f5f5f5]"
        />
        <Input
          label="First Name"
          placeholder="Enter First Name"
          {...register(`filings.${index}.firstName`)}
          labelClass="!bg-[#f5f5f5]"
        />
        <Input
          label="Middle Name"
          placeholder="Enter Middle Name"
          {...register(`filings.${index}.middleName`)}
          labelClass="!bg-[#f5f5f5]"
        />
        <Input
          label="Designation"
          placeholder="Enter Designation"
          {...register(`filings.${index}.designation`)}
          labelClass="!bg-[#f5f5f5]"
        />
        <Controller
          control={control}
          name={`filings.${index}.nationality`}
          render={({ field }) => (
            <Select
              title="Nationality"
              options={NATIONALITIES}
              placeholder="Select Nationality"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Input
          label="Gross Income"
          placeholder="Enter Amount"
          {...register(`filings.${index}.grossIncome`)}
          labelClass="!bg-[#f5f5f5]"
        />
        <Input
          label="Taxpayer ID"
          placeholder="Enter Taxpayer ID"
          {...register(`filings.${index}.taxpayerId`)}
          labelClass="!bg-[#f5f5f5]"
        />
        <Input
          label="Staff Phone Number"
          placeholder="Enter Phone Number"
          {...register(`filings.${index}.staffPhoneNumber`)}
          labelClass="!bg-[#f5f5f5]"
        />
        <Input
          label="Staff Email Address"
          placeholder="Enter Email Address"
          {...register(`filings.${index}.staffEmailAddress`)}
          labelClass="!bg-[#f5f5f5]"
        />
      </div>
    </div>
  );
}


