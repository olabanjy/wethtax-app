import BackButton from "@/components/ui/back-button";
import { useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import ProjectionSingleForm, {
  type ProjectionFilingFormValues,
} from "@/modules/dashboard/tax-filing/annual-single/projection-single-form";
import MultipleFilling from "@/modules/dashboard/tax-filing/multiple";
import { useFieldArray, useForm } from "react-hook-form";
import { LucideCirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSend } from "@/hooks/use-send";
import { useFetch } from "@/hooks/use-fetch";
import type { SelectOption } from "@/components/ui/select";
import { useSearchQuery } from "@/hooks/use-search-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  lastName: "",
  firstName: "",
  middleName: "",
  designation: "",
  nationality: "",
  grossIncome: "",
  taxpayerId: "",
  staffPhoneNumber: "",
  staffEmailAddress: "",
};

const CompanyFileProjection = () => {
  const [employeeType, setEmployeeType] = useState<"single" | "multiple" | "">(
    ""
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const form = useForm<ProjectionFilingFormValues>({
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
    "/location/countries/",
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

  const { mutateAsync: submitProjection, isPending } = useSend<
    {
      year: number;
      projection_returns: unknown[];
    },
    { message?: string }
  >("/returns/company/annual-returns/projection-returns/", {
    method: "post",
    hideToast: "none",
    successMessage: "Projection returns submitted successfully",
    errorMessage: "Failed to submit projection returns",
  });

  const { mutateAsync: uploadProjectionFile, isPending: isUploading } = useSend<
    FormData,
    { message?: string }
  >(
    "/returns/company/annual-returns/projection-returns/upload/",
    {
      method: "post",
      hideToast: "none",
      successMessage: "Projection returns file uploaded successfully",
      errorMessage: "Failed to upload projection returns file",
    }
  );

  const onSubmit = async (values: ProjectionFilingFormValues) => {
    if (employeeType === "multiple") {
      if (!uploadedFile) {
        toast.error("Please upload a CSV file before submitting.");
        return;
      }
      const formData = new FormData();
      formData.append("year", String(year));
      formData.append("file", uploadedFile);
      await uploadProjectionFile(formData);
      setUploadedFile(null);
      form.reset({ filings: [defaultValues] });
      navigate("/company/annual-returns");
      return;
    }

    const payload = {
      year,
      projection_returns: values.filings.map((f) => ({
        tax_payer_id: f.taxpayerId,
        surname: f.lastName,
        first_name: f.firstName,
        middle_name: f.middleName,
        designation: f.designation,
        gross_income: f.grossIncome,
        staff_phone_number: f.staffPhoneNumber,
        staff_email_address: f.staffEmailAddress,
        nationality: Number.parseInt(f.nationality || "0", 10),
      })),
    };
    await submitProjection(payload);
    form.reset({ filings: [defaultValues] });
    navigate("/company/annual-returns");
  };

  return (
    <div className="w-full space-y-10">
      <BackButton title="Projection Returns" />

      <div className="w-full space-y-6">
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

        <form
          className="w-full space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          {employeeType === "single" && (
            <div className="w-full space-y-4">
              <div>
                {fields.map((field, index) => (
                  <ProjectionSingleForm
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
              templateEndpoint="/returns/company/annual-returns/projection-returns/template/"
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

export default CompanyFileProjection;
