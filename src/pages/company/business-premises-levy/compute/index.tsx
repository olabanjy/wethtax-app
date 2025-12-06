import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ProcessingTaxModal from "@/components/ui/processing-tax-modal";
import { useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import type { BusinessPremisesLevy, Levies } from "@/types/returns";
import { useSend } from "@/hooks/use-send";
import { useSearchQuery } from "@/hooks/use-search-query";

const schema = z.object({
  companyRegNumber: z.string().min(1, "Number of Staff is required"),
  amount: z.string().min(1, "Levy Amount is required"),
});

const ComputeBusinessPremisesLevy = () => {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const { params } = useSearchQuery();
  const year = params.get("year") || new Date().getFullYear();
  const [amountPaid, setAmountPaid] = useState<string>("");

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyRegNumber: "",
      amount: "",
    },
    resolver: zodResolver(schema),
  });

  const { isLoading } = useFetch<{ data: Levies }>(
    "/returns/company/annual-returns/levies/",
    {
      hideToast: "success",
      onSuccess(data) {
        setValue("amount", data.data.premises_levy.toString());
      },
    }
  );

  const { isPending, isSuccess, mutate } = useSend<
    unknown,
    { data: BusinessPremisesLevy }
  >("/returns/company/annual-returns/premises-levy/", {
    hideToast: "success",
    onSuccess(data) {
      setAmountPaid(data?.data?.amount_paid.toString());
    },
  });

  const onSubmit = () => {
    setProcessing(true);
    mutate({
      year: Number(year),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="companyRegNumber">Company Registration Number</Label>
          <Input
            placeholder="Enter Company Registration Number"
            value={watch("companyRegNumber")}
            onChange={(e) => {
              setValue("companyRegNumber", e.target.value);
            }}
            error={errors.companyRegNumber?.message as string}
          />
        </div>
        <div>
          <Label htmlFor="amount">Levy Amount</Label>
          <Input
            placeholder="Enter Number"
            value={watch("amount")}
            onChange={(e) => {
              setValue("amount", e.target.value);
            }}
            isAmount
            disabled
            error={errors.amount?.message as string}
          />
        </div>
      </div>
      <div className="flex gap-3 justify-end mt-10">
        <Button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full max-w-[14rem] h-12"
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-full max-w-[14rem] h-12"
          loading={isLoading || isPending}
        >
          Proceed
        </Button>
      </div>
      <ProcessingTaxModal
        open={processing}
        toggle={() => setProcessing(!processing)}
        calculating={isPending}
        onProceed={() => {
          if (!isSuccess) {
            setProcessing(false);
            return;
          }
          navigate(`/company/business-premises-levy/compute/bill`, {
            state: { year, amount: amountPaid },
          });
        }}
      />
    </form>
  );
};

export default ComputeBusinessPremisesLevy;
