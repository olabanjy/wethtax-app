import BackButton from "@/components/ui/back-button";
import ScheduleForm, {
  type ScheduleFilingFormValues,
} from "@/modules/dashboard/tax-filing/annual-single/schedule-form";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useSend } from "@/hooks/use-send";
import { useSearchQuery } from "@/hooks/use-search-query";
import { useNavigate } from "react-router-dom";

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
  const { params } = useSearchQuery();
  const year = Number(params.get("year")) || new Date().getFullYear();
  const navigate = useNavigate();

  const { mutateAsync: submitSchedule, isPending } = useSend<
    {
      year: number;
      development_levy_revenue_item: string;
      development_levy_date_of_payment: string;
      development_levy_amount_paid: string;
      development_levy_receipt_number: string;
      development_levy_start_period_of_payment: string;
      development_levy_end_period_of_payment: string;
      business_premises_revenue_item: string;
      business_premises_date_of_payment: string;
      business_premises_amount_paid: string;
      business_premises_receipt_number: string;
      business_premises_start_period_of_payment: string;
      business_premises_end_period_of_payment: string;
    },
    { message?: string }
  >("/returns/company/annual-returns/schedule-returns/", {
    method: "post",
    hideToast: "none",
    successMessage: "Schedule returns submitted successfully",
    errorMessage: "Failed to submit schedule returns",
  });

  const toMonth = (val: string) => {
    if (!val) return "";
    // supports direct month names from select
    const MONTHS_UPPER = [
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
    ];
    if (MONTHS_UPPER.includes(val)) return val;
    // supports YYYY-MM and YYYY-MM-DD
    const m =
      /^(\d{4})-(\d{2})$/.exec(val) ||
      /^(\d{4})-(\d{2})-(\d{2})$/.exec(val);
    if (!m) return "";
    const idx = Number(m[2]) - 1;
    return MONTHS_UPPER[Math.max(0, Math.min(11, idx))] ?? "";
  };

  const nextMonth = (val: string) => {
    const MONTHS_UPPER = [
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
    ];
    const start = toMonth(val);
    const idx = MONTHS_UPPER.indexOf(start);
    if (idx === -1) return "";
    const nextIdx = (idx + 1) % 12;
    return MONTHS_UPPER[nextIdx];
  };

  const onSubmit = async (values: ScheduleFilingFormValues) => {
    const f = values.filings[0];
    if (!f) return;
    const devMonth = toMonth(f.development.periodOfPayment);
    const busMonth = toMonth(f.businessPremises.periodOfPayment);
    const payload = {
      year,
      development_levy_revenue_item: f.development.revenueItem,
      development_levy_date_of_payment: f.development.dateOfPayment,
      development_levy_amount_paid: f.development.amountPaid,
      development_levy_receipt_number: f.development.receiptNumber,
      development_levy_start_period_of_payment: devMonth,
      development_levy_end_period_of_payment: nextMonth(f.development.periodOfPayment),
      business_premises_revenue_item: f.businessPremises.revenueItem,
      business_premises_date_of_payment: f.businessPremises.dateOfPayment,
      business_premises_amount_paid: f.businessPremises.amountPaid,
      business_premises_receipt_number: f.businessPremises.receiptNumber,
      business_premises_start_period_of_payment: busMonth,
      business_premises_end_period_of_payment: nextMonth(f.businessPremises.periodOfPayment),
    };
    await submitSchedule(payload);
    form.reset({ filings: [defaultValues] });
    navigate("/company/annual-returns");
  };

  return (
    <div className="w-full space-y-10">
      <BackButton title="Schedule Returns" />

      <div className="w-full space-y-6">
        <form
          className="w-full space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
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

export default CompanyFileSchedule;
