import BackButton from "@/components/ui/back-button";
import ScheduleForm, {
  type ScheduleFilingFormValues,
} from "@/modules/dashboard/tax-filing/annual-single/schedule-form";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

const defaultValues = {
  development: {
    revenueItem: "",
    dateOfPayment: "",
    amountPaid: "",
    receiptNumber: "",
    periodOfPayment: "",
  },
  businessPremises: {
    revenueItem: "",
    dateOfPayment: "",
    amountPaid: "",
    receiptNumber: "",
    periodOfPayment: "",
  },
};

const CompanyFileSchedule = () => {
  const form = useForm<ScheduleFilingFormValues>({
    defaultValues: {
      filings: [defaultValues],
    },
  });
  const { control, register } = form;
  const { fields } = useFieldArray({
    control,
    name: "filings",
  });

  return (
    <div className="w-full space-y-10">
      <BackButton title="Schedule Returns" />

      <div className="w-full space-y-6">
        <div className="w-full space-y-4">
          <div>
            {fields.map((field, index) => (
              <ScheduleForm
                key={field.id}
                index={index}
                control={control}
                register={register}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex justify-end gap-3">
          <Button
            variant="outline"
            size="xl"
            className="w-[225px] border-black"
          >
            Save Draft
          </Button>

          <Button size="xl" className="w-[225px]">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyFileSchedule;
