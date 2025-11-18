import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { useForm } from "react-hook-form";

const ComputePIT = () => {
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
          <Label htmlFor="payerId">Your Tax Payer ID</Label>
          <Input placeholder="Enter Number" />
        </div>
        <div>
          <Label htmlFor="year">Year in View</Label>
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

export default ComputePIT;
