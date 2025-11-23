import BackButton from "@/components/ui/back-button";
import { useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import AnnualSingleForm, {
  type AnnualFilingFormValues,
} from "@/modules/dashboard/tax-filing/annual-single/annual-single-form";
import MultipleFilling from "@/modules/dashboard/tax-filing/multiple";
import { useFieldArray, useForm } from "react-hook-form";
import { LucideCirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSend } from "@/hooks/use-send";
import { toast } from "sonner";
import { useSearchQuery } from "@/hooks/use-search-query";
import { useFetch } from "@/hooks/use-fetch";
import type { SelectOption } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  lastName: "",
  firstName: "",
  middleName: "",
  designation: "",
  nationality: "",
  numberOfMonths: "",
  developmentLevy: "",
  grossIncome: "",
  chargeableIncome: "",
  annualTaxPaid: "",
  taxpayerId: "",
  staffPhoneNumber: "",
  staffEmailAddress: "",
};

const CompanyFileAnnualReturn = () => {
  const [employeeType, setEmployeeType] = useState<"single" | "multiple" | "">(
    ""
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const form = useForm<AnnualFilingFormValues>({
    defaultValues: {
      filings: [defaultValues],
    },
  });
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "filings",
  });

  const { params } = useSearchQuery();
  const year = Number(params.get("year")) || new Date().getFullYear();
  const navigate = useNavigate();

  const { data: nationalityOptions = [] } = useFetch<SelectOption[]>(
    "/tenant/lagos/api/v1/location/countries/",
    {
      select: (resp: unknown) => {
        const arr = Array.isArray(resp) ? resp : [];
        return arr.map((c: any) => ({
          label: String(c?.name ?? ""),
          value: String(c?.id ?? ""),
        }));
      },
      hideToast: "all",
      staleTime: 5 * 60 * 1000,
    }
  );

  const { mutateAsync: submitAnnual, isPending } = useSend<
    {
      year: number;
      annual_returns: unknown[];
    },
    { message?: string }
  >("/tenant/lagos/api/v1/returns/company/annual-returns/annual-returns/", {
    method: "post",
    hideToast: "none",
    successMessage: "Annual returns submitted successfully",
    errorMessage: "Failed to submit annual returns",
  });

  const { mutateAsync: submitAnnualUpload, isPending: isUploading } = useSend<
    FormData,
    { message?: string }
  >(
    "/tenant/lagos/api/v1/returns/company/annual-returns/annual-returns/upload/",
    {
      method: "post",
      hideToast: "none",
      successMessage: "Annual returns file uploaded successfully",
      errorMessage: "Failed to upload annual returns file",
    }
  );

  const onSubmit = async (values: AnnualFilingFormValues) => {
    if (employeeType === "multiple") {
      if (!uploadedFile) {
        toast.error("Please upload a CSV file before submitting.");
        return;
      }
      const formData = new FormData();
      formData.append("year", String(year));
      formData.append("file", uploadedFile);
      await submitAnnualUpload(formData);
      setUploadedFile(null);
      form.reset({ filings: [defaultValues] });
      navigate("/company/annual-returns");
    } else {
      const payload = {
        year,
        annual_returns: values.filings.map((f) => ({
          tax_payer_id: f.taxpayerId,
          surname: f.lastName,
          first_name: f.firstName,
          middle_name: f.middleName,
          designation: f.designation,
          gross_income: f.grossIncome,
          staff_phone_number: f.staffPhoneNumber,
          staff_email_address: f.staffEmailAddress,
          number_of_months: Number.parseInt(f.numberOfMonths || "0", 10),
          development_levy: f.developmentLevy,
          chargeable_income: f.chargeableIncome,
          annual_tax_paid: f.annualTaxPaid,
          nationality: Number.parseInt(f.nationality || "0", 10),
        })),
      };
      await submitAnnual(payload);
      form.reset({ filings: [defaultValues] });
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full space-y-10">
      <BackButton title="Annual Returns" />

      <div className="w-full space-y-6">
        <div className="w-full flex items-center justify-between gap-4 flex-wrap">
          <RadioGroup
            label="How many employees do you intend filing for?"
            name="employeeType"
            value={employeeType}
            onValueChange={(v) => setEmployeeType(v as "single" | "multiple")}
            options={[
              { label: "Single", value: "single" },
              { label: "Multiple", value: "multiple" },
            ]}
          />
        </div>

        <form
          className="w-full space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          {employeeType === "single" && (
            <div className="w-full space-y-4">
              <div>
                {fields.map((field, index) => (
                  <AnnualSingleForm
                    key={field.id}
                    index={index}
                    control={control}
                    register={register}
                    canDelete={fields.length > 1}
                    onDelete={() => remove(index)}
                    nationalities={nationalityOptions}
                  />
                ))}
              </div>

              <button
                type="button"
                className="flex items-center gap-2 text-[#777777] cursor-pointer hover:underline"
                onClick={() => append(defaultValues)}
              >
                <LucideCirclePlus size={20} />
                Add another employee's filing
              </button>
            </div>
          )}

          {employeeType === "multiple" && (
            <MultipleFilling
              uploadedFile={uploadedFile}
              setUploadedFile={setUploadedFile}
              templateEndpoint="/tenant/lagos/api/v1/returns/company/annual-returns/annual-returns/template/"
              templateParams={{ year }}
              accept=".csv"
            />
          )}

          {employeeType !== "" && (
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
                disabled={
                  (employeeType === "single" && isPending) ||
                  (employeeType === "multiple" &&
                    (isUploading || !uploadedFile))
                }
              >
                {employeeType === "multiple"
                  ? isUploading
                    ? "Uploading..."
                    : "Upload"
                  : isPending
                  ? "Submitting..."
                  : "Submit"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanyFileAnnualReturn;
