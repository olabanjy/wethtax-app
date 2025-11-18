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
          />
        )}

        {employeeType !== "" && (
          <div className="w-full flex justify-end gap-3">
            <Button
              variant="outline"
              size="xl"
              className="w-[225px] border-black"
            >
              Cancel
            </Button>

            <Button size="xl" className="w-[225px]">
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyFileProjection;
