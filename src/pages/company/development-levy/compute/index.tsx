import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ProcessingTaxModal from "@/components/ui/processing-tax-modal";
import { useState } from "react";
import { useSend } from "@/hooks/use-send";
import { useSearchQuery } from "@/hooks/use-search-query";
import { useFetch } from "@/hooks/use-fetch";
import type { CompanyDevelopmentLevy, Levies } from "@/types/returns";

const schema = z.object({
  number_of_staffs: z.string().min(1, "Number of Staff is required"),
  amount: z.string().min(1, "Levy Amount is required"),
});

const ComputeCompanyDevelopmentLevy = () => {
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
      number_of_staffs: "",
      amount: "",
    },
    resolver: zodResolver(schema),
  });

  const { isLoading } = useFetch<{ data: Levies }>(
    "/returns/company/annual-returns/levies/",
    {
      hideToast: "success",
      onSuccess(data) {
        setValue("amount", data.data.development_levy.toString());
      },
    }
  );

  const { isPending, isSuccess, mutate } = useSend<
    unknown,
    { data: CompanyDevelopmentLevy }
  >("/returns/company/annual-returns/development-levy/", {
    hideToast: "success",
    onSuccess(data) {
      setAmountPaid(data?.data?.amount_paid.toString());
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    setProcessing(true);
    mutate({
      number_of_staffs: parseInt(data.number_of_staffs.replace(/,/g, "")),
      year: Number(year),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="number_of_staffs">Number of Staff</Label>
          <Input
            isAmount
            placeholder="Enter Number of Staff"
            value={watch("number_of_staffs")}
            onChange={(e) => {
              setValue("number_of_staffs", e.target.value);
            }}
            error={errors.number_of_staffs?.message as string}
          />
        </div>
        <div>
          <Label htmlFor="amount">Levy Amount</Label>
          <Input
            isAmount
            disabled
            placeholder="Enter Number"
            value={watch("amount")}
            onChange={(e) => {
              setValue("amount", e.target.value);
            }}
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
          loading={isLoading || isPending}
          type="submit"
          className="w-full max-w-[14rem] h-12"
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
          } else {
            navigate(`/company/development-levy/compute/bill`, {
              state: { year, amount: amountPaid },
            });
          }
        }}
      />
    </form>
  );
};

export default ComputeCompanyDevelopmentLevy;
