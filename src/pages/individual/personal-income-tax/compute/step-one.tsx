import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useForm } from "react-hook-form";

const FilePITStepOne = () => {
  const { handleSubmit } = useForm({
    defaultValues: {
      payerId: "",
      year: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="block mb-4 text-lg font-medium text-gray-700"
            htmlFor="payerId"
          >
            Your Tax Payer ID
          </label>
          <Input placeholder="Enter Number" />
        </div>
        <div>
          <label
            className="block mb-4 text-lg font-medium text-gray-700"
            htmlFor="year"
          >
            Year in View
          </label>
          <Select options={[]} placeholder="Select Year" />
        </div>
      </div>
      <div className="flex gap-3 justify-end mt-10">
        <Button className="w-full max-w-[14rem] h-12" variant="outline">
          Cancel
        </Button>
        <Button className="w-full max-w-[14rem] h-12">Proceed</Button>
      </div>
    </form>
  );
};

export default FilePITStepOne;
