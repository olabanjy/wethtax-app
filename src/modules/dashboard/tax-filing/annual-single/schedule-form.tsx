import {
  Controller,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { DatePicker } from "@/components/ui/date-picker";

type Section = {
  revenueItem: string;
  dateOfPayment: string;
  amountPaid: string;
  receiptNumber: string;
  periodOfPayment: string;
};

export type ScheduleFiling = {
  development: Section;
  businessPremises: Section;
};

export type ScheduleFilingFormValues = {
  filings: ScheduleFiling[];
};

export default function ScheduleForm({
  index,
  control,
  register,
}: {
  index: number;
  control: Control<ScheduleFilingFormValues>;
  register: UseFormRegister<ScheduleFilingFormValues>;
}) {
  return (
    <div className={clsx("w-full flex flex-col gap-6")}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 py-6 border-y border-[#B8B8B8]">
          <h3 className="text-xl text-[#121212] font-medium">
            Development Levy
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Revenue Item"
              placeholder="Enter Revenue Item"
              {...register(`filings.${index}.development.revenueItem`)}
              labelClass="!bg-[#f5f5f5]"
            />
            <Controller
              control={control}
              name={`filings.${index}.development.dateOfPayment`}
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
              {...register(`filings.${index}.development.amountPaid`)}
              labelClass="!bg-[#f5f5f5]"
            />
            <Input
              label="Receipt Number"
              placeholder="Enter Receipt Number"
              {...register(`filings.${index}.development.receiptNumber`)}
              labelClass="!bg-[#f5f5f5]"
            />
            <Controller
              control={control}
              name={`filings.${index}.development.periodOfPayment`}
              render={({ field }) => (
                <DatePicker
                  title="Period of Payment"
                  placeholder="Select period"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl text-[#121212] font-medium">
            Business Premises
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Revenue Item"
              placeholder="Enter Revenue Item"
              {...register(`filings.${index}.businessPremises.revenueItem`)}
              labelClass="!bg-[#f5f5f5]"
            />
            <Controller
              control={control}
              name={`filings.${index}.businessPremises.dateOfPayment`}
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
              {...register(`filings.${index}.businessPremises.amountPaid`)}
              labelClass="!bg-[#f5f5f5]"
            />
            <Input
              label="Receipt Number"
              placeholder="Enter Receipt Number"
              {...register(`filings.${index}.businessPremises.receiptNumber`)}
              labelClass="!bg-[#f5f5f5]"
            />
            <Controller
              control={control}
              name={`filings.${index}.businessPremises.periodOfPayment`}
              render={({ field }) => (
                <DatePicker
                  title="Period of Payment"
                  placeholder="Select period"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
