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
  { label: "BANK INTEREST", value: "BANK INTEREST" },
  { label: "BUILDING CONSTRUCTION BRIDGES", value: "BUILDING CONSTRUCTION BRIDGES" },
  { label: "COMMISSION", value: "COMMISSION" },
  { label: "CONSULTANCY", value: "CONSULTANCY" },
  { label: "CONTRACT", value: "CONTRACT" },
  { label: "DIRECTORS_FEES", value: "DIRECTORS_FEES" },
  { label: "DIVIDEND", value: "DIVIDEND" },
  { label: "RENT", value: "RENT" },
  { label: "ROYALTY", value: "ROYALTY" },
  { label: "TECHNICAL SERVICES", value: "TECHNICAL SERVICES" },
];

const MONTH_OPTIONS = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
].map((m) => ({ label: m, value: m }));

export type WithholdingFiling = {
  dateOfPayment: string;
  amountPaid: string;
  startPeriod: string;
  endPeriod: string;
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
          name={`filings.${index}.startPeriod`}
          render={({ field }) => (
            <Select title="Start Period (Month)" options={MONTH_OPTIONS} value={field.value} onChange={field.onChange} placeholder="Select month" />
          )}
        />

        <Controller
          control={control}
          name={`filings.${index}.endPeriod`}
          render={({ field }) => (
            <Select title="End Period (Month)" options={MONTH_OPTIONS} value={field.value} onChange={field.onChange} placeholder="Select month" />
          )}
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
