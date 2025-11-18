import BackButton from "@/components/ui/back-button";
import WithholdingSingleForm, {
  type WithholdingFilingFormValues,
} from "@/modules/dashboard/tax-filing/annual-single/withholding-single-form";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

const defaultValues = {
  dateOfPayment: "",
  amountPaid: "",
  periodOfPayment: "",
  receiptNumber: "",
  withholdingType: "",
};

const CompanyFileWithholding = () => {
  const form = useForm<WithholdingFilingFormValues>({
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
      <BackButton title="Withholding Tax" />

      <div className="w-full space-y-6">
        <div className="w-full space-y-4">
          <div>
            {fields.map((field, index) => (
              <WithholdingSingleForm
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

export default CompanyFileWithholding;
