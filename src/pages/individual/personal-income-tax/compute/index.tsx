import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { YEARS } from "@/constants/common";
import { useSearchQuery } from "@/hooks/use-search-query";
import { useSend } from "@/hooks/use-send";
import useUser from "@/hooks/use-user-type";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IndividualReturn } from "@/types/returns";

const schema = z.object({
  year: z.string().min(1, "Year is required"),
  payerId: z.string().min(1, "Tax Payer ID is required"),
});

const ComputePIT = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { params } = useSearchQuery();
  const year = params.get("year");

  const { mutateAsync: computePIT, isPending } = useSend(
    "/returns/individual/",
    {
      hideToast: "success",
      onSuccess: (data: IndividualReturn) =>
        navigate(
          `/individual/personal-income-tax/compute/income?id=${data.id}`
        ),
    }
  );

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      payerId: user?.profile?.tax_payer_id || "",
      year: year || "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    computePIT({
      return_type: "PERSONAL INCOME TAX",
      year_in_view: data.year,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
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
            options={YEARS.map((y) => ({
              value: y.toString(),
              label: y.toString(),
            }))}
            value={watch("year")}
            placeholder="Select Year"
            error={errors.year?.message}
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
          loading={isPending}
          className="w-full max-w-[14rem] h-12"
        >
          Proceed
        </Button>
      </div>
    </form>
  );
};

export default ComputePIT;
