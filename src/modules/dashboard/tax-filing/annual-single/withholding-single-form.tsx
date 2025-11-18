import {
  Controller,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import clsx from "clsx";
import { DatePicker } from "@/components/ui/date-picker";

const WITHHOLDING_TYPES = [
  { label: "Contractor/Supplier", value: "contractor" },
  { label: "Rent", value: "rent" },
  { label: "Interest", value: "interest" },
  { label: "Dividend", value: "dividend" },
  { label: "Other", value: "other" },
];

export type WithholdingFiling = {
  dateOfPayment: string;
  amountPaid: string;
  periodOfPayment: string;
  receiptNumber: string;
  withholdingType: string;
};

export type WithholdingFilingFormValues = {
  filings: WithholdingFiling[];
};

export default function WithholdingSingleForm({
  index,
  control,
  register,
}: {
  index: number;
  control: Control<WithholdingFilingFormValues>;
  register: UseFormRegister<WithholdingFilingFormValues>;
}) {
  return (
    <div className={clsx("w-full py-4 flex flex-col gap-4")}>
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
        <Controller
          control={control}
          name={`filings.${index}.dateOfPayment`}
          render={({ field }) => (
            <DatePicker
              title="Date of Payment"
              placeholder="Select date"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Input
          label="Amount Paid"
          placeholder="Enter Amount"
          {...register(`filings.${index}.amountPaid`)}
          labelClass="!bg-[#f5f5f5]"
        />

        <Controller
          control={control}
          name={`filings.${index}.periodOfPayment`}
          render={({ field }) => (
            <DatePicker
              title="Period of Payment"
              placeholder="Select period"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Input
          label="Receipt Number"
          placeholder="Enter Receipt Number"
          {...register(`filings.${index}.receiptNumber`)}
          labelClass="!bg-[#f5f5f5]"
        />

        <Controller
          control={control}
          name={`filings.${index}.withholdingType`}
          render={({ field }) => (
            <Select
              title="Type of Withholding"
              options={WITHHOLDING_TYPES}
              placeholder="Select type"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
