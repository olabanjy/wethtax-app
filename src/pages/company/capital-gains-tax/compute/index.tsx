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
import { YEARS } from "@/constants/common";
import { useSearchQuery } from "@/hooks/use-search-query";

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

  const onSubmit = () => {
    setProcessing(true);
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
              "Treasury Bill",
              "Vehicle",
            ].map((y) => ({
              value: y,
              label: y,
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
            options={YEARS.map((y) => ({
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
        <Button type="submit" className="w-full max-w-[14rem] h-12">
          Proceed
        </Button>
      </div>
      <ProcessingTaxModal
        open={processing}
        toggle={() => setProcessing(!processing)}
        calculating={false}
        onProceed={() => navigate(`/company/capital-gains-tax/compute/bill`)}
      />
    </form>
  );
};

export default ComputeCapitalGainsTax;
