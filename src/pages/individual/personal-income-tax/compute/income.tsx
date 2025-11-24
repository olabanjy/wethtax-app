import { Button } from "@/components/ui/button";
import FileUpload from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useSearchQuery } from "@/hooks/use-search-query";
import { useSend } from "@/hooks/use-send";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, PlusCircleIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import z from "zod";

const schema = z.object({
  salary: z.string().min(1, "Salary is a required field"),
  commission: z.string().min(1, "Commission is a required field"),
  trade_income: z.string().min(1, "Trade income is a required field"),
  allowance: z.string().min(1, "Allowance is a required field"),
  pension: z.string().min(1, "Pension is a required field"),
  annuity: z.string().min(1, "Annuity is a required field"),
  gratuities: z.string().min(1, "Gratuities is a required field"),
  foreign_income: z.string().min(1, "Foreign income is a required field"),
  dividend: z.string().min(1, "Dividend is a required field"),
  interest: z.string().min(1, "Interest is a required field"),
  rent: z.string().min(1, "Rent is a required field"),
  other_incomes: z.array(
    z.object({
      name: z.string().min(1, "Provide income name"),
      details: z.string().optional(),
      value: z.string().min(1, "Provide income value"),
    })
  ),
});

const defaultValues = {
  salary: "",
  commission: "",
  trade_income: "",
  allowance: "",
  pension: "",
  annuity: "",
  gratuities: "",
  foreign_income: "",
  dividend: "",
  interest: "",
  rent: "",
  other_incomes: [],
};

const IncomePIT = () => {
  const navigate = useNavigate();
  const { params } = useSearchQuery();
  const id = params.get("id");
  const [file, setFile] = useState<File | null>(null);

  const { mutateAsync: saveIncome, isPending } = useSend(
    `/returns/individual/${id}/income/`,
    {
      successMessage: "Income saved successfully",
      onSuccess: () =>
        navigate(
          `/individual/personal-income-tax/compute/accommodation?id=${id}`
        ),
    }
  );

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const otherIncomes = watch("other_incomes") ?? [];

  const removeAdditionalIncome = (index: number) => {
    const format = otherIncomes?.filter((_, key) => key !== index);

    setValue("other_incomes", format);
  };

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (file) {
      const formData = new FormData();
      formData.append("statement_of_income", file);
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      saveIncome(formData);
    } else {
      saveIncome(data);
    }
  };

  if (!id) return <Navigate to="/individual/personal-income-tax" />;

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-lg font-medium mb-6">
          Statement of Income (Gross Annual Income)
        </p>
        <div className="border-b border-gray-200 pb-6 mb-6">
          <FileUpload
            value={file}
            setValue={(files) => setFile(files?.[0] || null)}
          />
        </div>
        <div className="flex items-center gap-2.5 mb-9">
          <InfoIcon fill="#5D5EBA" color="#fff" />
          <p className="text-gray-500">
            Each amount entered below would be calculated on a yearly basis
          </p>
        </div>
        <div className="grid grid-cols-3 gap-x-4 gap-y-6">
          <div>
            <Label htmlFor="salary">Salary</Label>
            <Input
              isAmount
              placeholder="Enter Number"
              {...register("salary")}
              error={errors.salary?.message}
            />
          </div>
          <div>
            <Label htmlFor="Commission">Commission</Label>
            <Input
              isAmount
              placeholder="Enter Number"
              {...register("commission")}
              error={errors.commission?.message}
            />
          </div>
          <div>
            <Label htmlFor="Trade Income">Trade Income</Label>
            <Input
              isAmount
              placeholder="Enter Number"
              {...register("trade_income")}
              error={errors.trade_income?.message}
            />
          </div>
          <div>
            <Label htmlFor="Allowance">Allowance</Label>
            <Input
              isAmount
              placeholder="Enter Number"
              {...register("allowance")}
              error={errors.allowance?.message}
            />
          </div>
          <div>
            <Label htmlFor="Pension">Pension</Label>
            <Input
              isAmount
              placeholder="Enter Number"
              {...register("pension")}
              error={errors.pension?.message}
            />
          </div>
          <div>
            <Label htmlFor="Annuity">Annuity</Label>
            <Input
              isAmount
              placeholder="Enter Number"
              {...register("annuity")}
              error={errors.annuity?.message}
            />
          </div>
          <div>
            <Label htmlFor="Gratuities">Gratuities</Label>
            <Input
              isAmount
              placeholder="Enter Number"
              {...register("gratuities")}
              error={errors.gratuities?.message}
            />
          </div>
          <div>
            <Label htmlFor="Foreign Income">Foreign Income</Label>
            <Input
              isAmount
              placeholder="Enter Number"
              {...register("foreign_income")}
              error={errors.foreign_income?.message}
            />
          </div>
          <div>
            <Label htmlFor="Dividend">Dividend</Label>
            <Input
              isAmount
              placeholder="Enter Number"
              {...register("dividend")}
              error={errors.dividend?.message}
            />
          </div>
          <div>
            <Label htmlFor="Interest">Interest</Label>
            <Input
              isAmount
              placeholder="Enter Number"
              {...register("interest")}
              error={errors.interest?.message}
            />
          </div>
          <div>
            <Label htmlFor="Rent">Rent</Label>
            <Input
              isAmount
              placeholder="Enter Number"
              {...register("rent")}
              error={errors.rent?.message}
            />
          </div>
        </div>
        <div className="flex items-center gap-16 mt-10">
          <p className="font-medium text-gray-700">Other Income(s)</p>
          <Button
            type="button"
            variant="link"
            className="text-[#0C7C10] text-base"
            onClick={() =>
              setValue("other_incomes", [
                ...otherIncomes,
                { name: "", value: "" },
              ])
            }
          >
            <PlusCircleIcon color="#fff" fill="#0C7C10" />
            Add Income
          </Button>
        </div>
        <div className="flex flex-col gap-6 mt-10">
          {otherIncomes.map((_, index) => (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="Name">Name</Label>
                <Input
                  placeholder="Enter Name"
                  {...register(`other_incomes.${index}.name`)}
                  error={errors.other_incomes?.[index]?.name?.message}
                />
              </div>
              <div>
                <Label htmlFor="Amount">Amount</Label>
                <Input
                  isAmount
                  placeholder="Enter Number"
                  {...register(`other_incomes.${index}.value`)}
                  error={errors.other_incomes?.[index]?.value?.message}
                />
              </div>
              <div className="flex flex-col justify-center">
                <Label htmlFor="Remove" className="invisible">
                  Remove
                </Label>
                <Button
                  type="button"
                  variant="link"
                  className="text-base w-fit"
                  onClick={() => removeAdditionalIncome(index)}
                >
                  <XIcon />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 flex justify-end gap-6">
          <Button
            type="button"
            className="w-full max-w-[14rem] h-12"
            variant="outline"
          >
            Save to Draft
          </Button>
          <Button
            type="submit"
            loading={isPending}
            className="w-full max-w-[14rem] h-12"
          >
            Next
          </Button>
        </div>
      </form>
    </section>
  );
};

export default IncomePIT;
