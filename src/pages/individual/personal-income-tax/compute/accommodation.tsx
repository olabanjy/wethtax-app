import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import ProcessingTaxModal from "@/components/ui/processing-tax-modal";
import { Select } from "@/components/ui/select";
import SubmitButtonGroup from "@/components/ui/submit-button-group";
import { useSearchQuery } from "@/hooks/use-search-query";
import { useSend } from "@/hooks/use-send";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";

const schema = z.object({
  accommodation_type: z
    .string()
    .min(1, "Accommodation type is a required field"),
  ownership_type: z.string().min(1, "Ownership type is a required field"),
  owner_name: z.string().min(1, "Owner's name is a required field"),
  owner_address: z.string().min(1, "Owner's address is a required field"),
  owner_tax_payer_number: z
    .string()
    .min(1, "Owner tax payer number is a required field"),
  rent_paid: z.string().min(1, "Rent paid is a required field"),
  rent_paid_by_employer: z
    .string()
    .min(1, "Rent paid by employer is a required field"),
  start_date: z.string().min(1, "Start date is a required field"),
  end_date: z.string().min(1, "End date is a required field"),
  address: z.string().min(1, "Address is a required field"),
});

const defaultValues = {
  accommodation_type: "",
  ownership_type: "",
  owner_name: "",
  owner_address: "",
  owner_tax_payer_number: "",
  rent_paid: "",
  rent_paid_by_employer: "",
  start_date: "",
  end_date: "",
  address: "",
};

const AccommodationPIT = () => {
  const navigate = useNavigate();
  const { params } = useSearchQuery();
  const id = params.get("id");
  const [processing, setProcessing] = useState(false);
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

  const { mutate: calculate, isPending: calculating } = useSend(
    `/returns/individual/${id}/accommodation/`,
    {
      successMessage: "Accommodation calculated successfully",
      onSuccess: (data) => {
        console.log({ data });
      },
      onError: () => {
        setProcessing(false);
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    setProcessing(true);
    calculate(data);
  });

  return (
    <section>
      <p className="text-lg font-medium mb-10">
        Mandatory Disclosure of Accommodation
      </p>
      <form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="Address">Address</Label>
          <Input
            placeholder="Enter Address"
            {...register("address")}
            error={errors.address?.message}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 my-6">
          <div>
            <Label htmlFor="Accommodation Type">Accommodation Type</Label>
            <Input
              placeholder="Enter Accommodation Type"
              {...register("accommodation_type")}
              error={errors.accommodation_type?.message}
            />
          </div>
          <div>
            <Label htmlFor="Ownership Type">Ownership Type</Label>
            <Select
              options={[
                {
                  label: "Tenant",
                  value: "TENANT",
                },
                {
                  label: "Landlord",
                  value: "LANDLORD",
                },
                {
                  label: "Others",
                  value: "OTHERS",
                },
              ]}
              placeholder="Select Ownership Type"
              error={errors.ownership_type?.message}
              value={watch("ownership_type")}
              onChange={(value) => setValue("ownership_type", value)}
            />
          </div>
          <div>
            <Label htmlFor="Owner Name">Owner Name</Label>
            <Input
              placeholder="Enter Name"
              {...register("owner_name")}
              error={errors.owner_name?.message}
            />
          </div>
          <div>
            <Label htmlFor="Owner Tax ID">Owner Tax ID</Label>
            <Input
              placeholder="Enter Tax ID"
              {...register("owner_tax_payer_number")}
              error={errors.owner_tax_payer_number?.message}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="Owner Address">Owner Address</Label>
          <Input
            placeholder="Enter Address"
            {...register("owner_address")}
            error={errors.owner_address?.message}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 my-6">
          <div>
            <Label htmlFor="Rent Paid">Rent Paid</Label>
            <Input
              isAmount
              placeholder="Enter Amount"
              {...register("rent_paid")}
              error={errors.rent_paid?.message}
            />
          </div>
          <div>
            <Label htmlFor="Rent Paid By Employer">Rent Paid By Employer</Label>
            <Input
              isAmount
              placeholder="Enter Amount"
              {...register("rent_paid_by_employer")}
              error={errors.rent_paid_by_employer?.message}
            />
          </div>
          <div>
            <Label htmlFor="Start Date">Start Date</Label>
            <DatePicker
              placeholder="Enter Start Date"
              error={errors.start_date?.message}
              value={watch("start_date")}
              onChange={(value) => setValue("start_date", value)}
            />
          </div>
          <div>
            <Label htmlFor="End Date">End Date</Label>
            <DatePicker
              placeholder="Enter End Date"
              error={errors.end_date?.message}
              value={watch("end_date")}
              onChange={(value) => setValue("end_date", value)}
            />
          </div>
        </div>
        <SubmitButtonGroup
          firstButtonProps={{
            children: "Save to Draft",
            variant: "outline",
            type: "button",
          }}
          secondButtonProps={{
            loading: calculating,
            children: "Next",
            type: "submit",
          }}
        />
      </form>
      <ProcessingTaxModal
        open={processing}
        toggle={() => setProcessing(!processing)}
        calculating={calculating}
        onProceed={() =>
          navigate(`/individual/personal-income-tax/compute/bill?id=${id}`)
        }
      />
    </section>
  );
};

export default AccommodationPIT;
