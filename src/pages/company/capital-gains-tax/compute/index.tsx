import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ProcessingTaxModal from "@/components/ui/processing-tax-modal";
import { useState } from "react";
import { Select } from "@/components/ui/select";
import { PREVIOUS_YEARS } from "@/constants/common";
import { useSearchQuery } from "@/hooks/use-search-query";
import type { CapitalGainsTax } from "@/types/returns";
import { useSend } from "@/hooks/use-send";

const schema = z.object({
  acquisitionPrice: z.string().min(1, "Acquisition Price is required"),
  sellingPrice: z.string().min(1, "Selling Price is required"),
  year: z.string().min(1, "Year is required"),
  assetDisposed: z.string().min(1, "Asset Disposed is required"),
});

const ComputeCapitalGainsTax = () => {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
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
      acquisitionPrice: "",
      sellingPrice: "",
      year: year || "",
      assetDisposed: "",
    },
    resolver: zodResolver(schema),
  });

  const { isPending, isSuccess, mutate } = useSend<
    unknown,
    { data: CapitalGainsTax }
  >("/returns/company/annual-returns/capital-gain/", {
    hideToast: "success",
    onSuccess(data) {
      setAmountPaid(data?.data?.amount_paid.toString());
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    setProcessing(true);
    mutate({
      year: data.year,
      asset: data.assetDisposed,
      acquisition_price: data.acquisitionPrice,
      selling_price: data.sellingPrice,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="assetDisposed">Asset Disposed</Label>
          <Select
            options={[
              "Building",
              "Furniture",
              "Machinery",
              "Treasury-Bill",
              "Vehicle",
            ].map((y) => ({
              label: y.replace("-", " "),
              value: y.toUpperCase(),
            }))}
            value={watch("assetDisposed")}
            onChange={(e) => {
              setValue("assetDisposed", e);
            }}
            placeholder="Select Asset Disposed"
            error={errors.assetDisposed?.message}
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
            onChange={(e) => {
              setValue("year", e);
            }}
            placeholder="Select Year"
            error={errors.year?.message}
          />
        </div>
        <div>
          <Label htmlFor="acquisitionPrice">Acquisition Price</Label>
          <Input
            isAmount
            placeholder="Enter Acquisition Price"
            value={watch("acquisitionPrice")}
            onChange={(e) => {
              setValue("acquisitionPrice", e.target.value);
            }}
            error={errors.acquisitionPrice?.message as string}
          />
        </div>
        <div>
          <Label htmlFor="sellingPrice">Selling Price</Label>
          <Input
            isAmount
            placeholder="Enter Selling Price"
            value={watch("sellingPrice")}
            onChange={(e) => {
              setValue("sellingPrice", e.target.value);
            }}
            error={errors.sellingPrice?.message as string}
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
          loading={isPending}
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
            return;
          }
          navigate(`/company/capital-gains-tax/compute/bill`, {
            state: { year, amount: amountPaid },
          });
        }}
      />
    </form>
  );
};

export default ComputeCapitalGainsTax;
