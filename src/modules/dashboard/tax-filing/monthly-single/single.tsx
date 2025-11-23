import { useState } from "react";
import {
  Controller,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { STATES } from "@/constants/states";
import {
  LucideChevronDown,
  LucideCircleAlert,
  LucideTrash,
} from "lucide-react";
import clsx from "clsx";
import { DatePicker } from "@/components/ui/date-picker";

export type Filing = {
  tin: string;
  month: string;
  state: string;
  basic: string;
  transport: string;
  housing: string;
  nhs: string;
  nps: string;
  bonus: string;
  others: string;
  grossEmolument: string;
  chargeableIncome: string;
  consolidatedRelief: string;
};

export type FilingFormValues = {
  filings: Filing[];
};

export default function SingleFilingForm({
  index,
  control,
  register,
  canDelete,
  onDelete,
}: {
  index: number;
  control: Control<FilingFormValues>;
  register: UseFormRegister<FilingFormValues>;
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
            PAYE Filing {index + 1}
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

      <div className={open ? "flex items-center gap-2" : "hidden"}>
        <LucideCircleAlert size={20} fill="#5D5EBA" color="#fff" />

        <p className="text-[#717171] text-[15px]">
          Each amount entered below would be calculated on a yearly basis
        </p>
      </div>

      <div
        className={open ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "hidden"}
      >
        <Input
          label="Payer ID/Tax Identification Number (TIN)"
          placeholder="Enter Number"
          {...register(`filings.${index}.tin`)}
          labelClass="!bg-[#f5f5f5]"
        />

        <Controller
          control={control}
          name={`filings.${index}.month`}
          render={({ field }) => (
            <DatePicker
              title="Month in View"
              placeholder="Enter Month"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          control={control}
          name={`filings.${index}.state`}
          render={({ field }) => (
            <Select
              title="State of Operation"
              options={STATES}
              placeholder="Select State"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Input
          label="Basic"
          placeholder="Enter Amount"
          {...register(`filings.${index}.basic`)}
          labelClass="!bg-[#f5f5f5]"
        />

        <Input
          label="Transport"
          placeholder="Enter Amount"
          {...register(`filings.${index}.transport`)}
          labelClass="!bg-[#f5f5f5]"
        />

        <Input
          label="Housing"
          placeholder="Enter Amount"
          {...register(`filings.${index}.housing`)}
          labelClass="!bg-[#f5f5f5]"
        />

        <Input
          label="NHS"
          placeholder="Enter Amount"
          {...register(`filings.${index}.nhs`)}
          labelClass="!bg-[#f5f5f5]"
        />

        <Input
          label="NPS"
          placeholder="Enter Amount"
          {...register(`filings.${index}.nps`)}
          labelClass="!bg-[#f5f5f5]"
        />

        <Input
          label="Bonus"
          placeholder="Enter Amount"
          {...register(`filings.${index}.bonus`)}
          labelClass="!bg-[#f5f5f5]"
        />

        <Input
          label="Others"
          placeholder="Enter Amount"
          {...register(`filings.${index}.others`)}
          labelClass="!bg-[#f5f5f5]"
        />

        <div className="col-span-2">
          <Input
            label="Gross Emolument"
            placeholder="Enter Amount"
            {...register(`filings.${index}.grossEmolument`)}
            labelClass="!bg-[#f5f5f5]"
          />
        </div>

        <Input
          label="Chargeable Income"
          placeholder="Enter Amount"
          {...register(`filings.${index}.chargeableIncome`)}
          labelClass="!bg-[#f5f5f5]"
        />

        <Input
          label="Consolidated Relief"
          placeholder="Enter Amount"
          {...register(`filings.${index}.consolidatedRelief`)}
          labelClass="!bg-[#f5f5f5]"
        />
      </div>
    </div>
  );
}
