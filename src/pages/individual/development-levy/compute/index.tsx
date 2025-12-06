import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { PREVIOUS_YEARS } from "@/constants/common";
import { useSearchQuery } from "@/hooks/use-search-query";
import useUser from "@/hooks/use-user-type";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ProcessingTaxModal from "@/components/ui/processing-tax-modal";
import { useState } from "react";
import { useSend } from "@/hooks/use-send";
import type { IndividualDevelopmentLevy } from "@/types/returns";

const schema = z.object({
  year: z.string().min(1, "Year is required"),
  payerId: z.string().min(1, "Tax Payer ID is required"),
  amount: z.string().min(1, "Levy Amount is required"),
});

const ComputeIndividualDevelopmentLevy = () => {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { params } = useSearchQuery();
  const year = params.get("year");
  const [amountPaid, setAmountPaid] = useState<string>("");

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      payerId: user?.profile?.tax_payer_id || "test",
      year: year || "",
      amount: "",
    },
    resolver: zodResolver(schema),
  });

  const { isPending, isSuccess, mutate } = useSend<
    unknown,
    { data: IndividualDevelopmentLevy }
  >("/returns/individual/development-levy/", {
    onSuccess(data) {
      setAmountPaid(data?.data?.amount_paid.toString());
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    setProcessing(true);
    mutate({
      year: data.year,
      payer_id: data.payerId,
      amount_paid: parseFloat(data.amount.replace(/,/g, "")),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="payerId">Your Tax Payer ID</Label>
          <Input
            placeholder="Enter Number"
            value={watch("payerId")}
            disabled
            error={errors.payerId?.message as string}
          />
        </div>
        <div>
          <Label htmlFor="year">Year in View</Label>
          <Select
            options={PREVIOUS_YEARS.map((y) => ({
              value: y.toString(),
              label: y.toString(),
            }))}
            value={watch("year")}
            placeholder="Select Year"
            error={errors.year?.message}
            onChange={(e) => {
              setValue("year", e);
            }}
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
        <Button type="submit" className="w-full max-w-[14rem] h-12">
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
          navigate(`/individual/development-levy/compute/bill`, {
            state: { year, amount: amountPaid },
          });
        }}
      />
    </form>
  );
};

export default ComputeIndividualDevelopmentLevy;
