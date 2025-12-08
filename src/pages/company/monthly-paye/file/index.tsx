import BackButton from "@/components/ui/back-button";
import { useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import SingleFilingForm, {
  type FilingFormValues,
} from "@/modules/dashboard/tax-filing/monthly-single/single";
import { useFieldArray, useForm } from "react-hook-form";
import { LucideCirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import MultipleFilling from "@/modules/dashboard/tax-filing/multiple";
import { useSearchQuery } from "@/hooks/use-search-query";
import { useSend } from "@/hooks/use-send";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ProcessingTaxModal from "@/components/ui/processing-tax-modal";

const defaultValues = {
  tin: "",
  month: "",
  state: "",
  basic: "",
  transport: "",
  housing: "",
  nhs: "",
  nps: "",
  bonus: "",
  others: "",
  grossEmolument: "",
  chargeableIncome: "",
  consolidatedRelief: "",
};

const CompanyFileMonthly = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileId, setFileId] = useState<number | null>(null);

  const navigate = useNavigate();
  const { params } = useSearchQuery();

  const monthParam = (params.get("month") || "").toString();
  const yearParam = Number(params.get("year") || new Date().getFullYear());

  const [employeeType, setEmployeeType] = useState<"single" | "multiple" | "">(
    ""
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const form = useForm<FilingFormValues>({
    defaultValues: {
      filings: [defaultValues],
    },
  });
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "filings",
  });

  const {
    mutateAsync: submitMonthlyPaye,
    isPending,
    isSuccess,
  } = useSend<any, any>("/returns/company/monthly-returns/monthly-payee/", {
    method: "post",
  });

  const {
    mutateAsync: uploadMonthlyPayeFile,
    isPending: isUploading,
    isSuccess: isUploadSuccess,
  } = useSend<FormData, any>(
    "/returns/company/monthly-returns/monthly-payee/upload/",
    {
      method: "post",
    }
  );

  const onSubmit = async (values: FilingFormValues) => {
    const monthly_payees = values.filings.map((f) => ({
      staff_tax_payer_id: f.tin || "",
      basic: f.basic || "",
      transport: f.transport || "",
      housing: f.housing || "",
      others: f.others || "",
      bonus: f.bonus || "",
      npf: f.nps || "",
      nhf: f.nhs || "",
      state_of_residence: Number(f.state) || 0,
    }));

    const payload = {
      year: yearParam,
      month: monthParam.toUpperCase(),
      monthly_payees,
    };

    setIsProcessing(true);

    const res = await submitMonthlyPaye(payload);
    const id =
      (res as any)?.data?.id ??
      (res as any)?.data?.data?.id ??
      (res as any)?.id ??
      null;
    setFileId(id != null ? Number(id) : null);
  };

  const onUpload = async () => {
    if (!uploadedFile) {
      toast.error("Please select a CSV or XLSX file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("year", String(yearParam));
    formData.append("month", monthParam.toUpperCase());
    formData.append("file", uploadedFile);

    setIsProcessing(true);
    const res = await uploadMonthlyPayeFile(formData);
    const id =
      (res as any)?.data?.id ??
      (res as any)?.data?.data?.id ??
      (res as any)?.id ??
      null;
    setFileId(id != null ? Number(id) : null);
  };

  return (
    <div className="w-full space-y-10">
      <ProcessingTaxModal
        open={isProcessing}
        toggle={() => setIsProcessing(false)}
        calculating={isPending || isUploading}
        onProceed={() => {
          if ((!isSuccess && !isUploadSuccess) || !fileId) {
            setIsProcessing(false);
            return;
          }
          navigate(`/company/monthly-paye/${fileId}/summary`);
        }}
      />

      <BackButton title="Monthly PAYE" />

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

        {employeeType === "single" && (
          <div className="w-full space-y-4">
            <div>
              {fields.map((field, index) => (
                <SingleFilingForm
                  key={field.id}
                  index={index}
                  control={control}
                  register={register}
                  canDelete={fields.length > 1}
                  onDelete={() => remove(index)}
                />
              ))}
            </div>

            <button
              type="button"
              className="flex items-center gap-2 text-[#777777] cursor-pointer hover:underline"
              onClick={() => append(defaultValues)}
            >
              <LucideCirclePlus size={20} />
              Add another employee's PAYE
            </button>
          </div>
        )}

        {employeeType === "multiple" && (
          <MultipleFilling
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
          />
        )}

        {employeeType !== "" && (
          <div className="w-full flex justify-end gap-3">
            <Button
              variant="outline"
              size="xl"
              className="w-[225px] border-black"
              type="button"
              onClick={() => navigate("/company/monthly-paye")}
            >
              Cancel
            </Button>

            <Button
              size="xl"
              className="w-[225px]"
              type="button"
              disabled={
                isPending ||
                isUploading ||
                (employeeType === "multiple" && !uploadedFile)
              }
              onClick={
                employeeType === "multiple"
                  ? onUpload
                  : form.handleSubmit(onSubmit)
              }
            >
              Proceed
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyFileMonthly;
