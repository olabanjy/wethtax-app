import BackButton from "@/components/ui/back-button";
import WithholdingSingleForm, {
  type WithholdingFilingFormValues,
} from "@/modules/dashboard/tax-filing/annual-single/withholding-single-form";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useSend } from "@/hooks/use-send";
import { useSearchQuery } from "@/hooks/use-search-query";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  dateOfPayment: "",
  amountPaid: "",
  startPeriod: "",
  endPeriod: "",
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

  const { params } = useSearchQuery();
  const year = Number(params.get("year")) || new Date().getFullYear();
  const navigate = useNavigate();

  const { mutateAsync: submitWithholding, isPending } = useSend<
    {
      year: number;
      date_of_payment: string;
      amount_paid: string;
      start_period_of_payment: string;
      end_period_of_payment: string;
      type_of_witholding: string;
    },
    { message?: string }
  >("/tenant/lagos/api/v1/returns/company/annual-returns/witholding-tax/", {
    method: "post",
    hideToast: "none",
    successMessage: "Withholding tax submitted successfully",
    errorMessage: "Failed to submit withholding tax",
  });

  const onSubmit = async (values: WithholdingFilingFormValues) => {
    const f = values.filings[0];
    if (!f) return;
    const payload = {
      year,
      date_of_payment: f.dateOfPayment,
      amount_paid: f.amountPaid,
      start_period_of_payment: f.startPeriod,
      end_period_of_payment: f.endPeriod,
      type_of_witholding: f.withholdingType,
    };
    await submitWithholding(payload);
    form.reset({ filings: [defaultValues] });
    navigate("/company/annual-returns");
  };

  return (
    <div className="w-full space-y-10">
      <BackButton title="Withholding Tax" />

      <div className="w-full space-y-6">
        <form
          className="w-full space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
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
              type="button"
              variant="outline"
              size="xl"
              className="w-[225px] border-black"
              onClick={() => history.back()}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              size="xl"
              className="w-[225px]"
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyFileWithholding;
