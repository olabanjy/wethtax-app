import { Button } from "@/components/ui/button";
import FileUpload from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { InfoIcon, PlusCircleIcon, XIcon } from "lucide-react";

const IncomePIT = () => {
  return (
    <section>
      <div>
        <p className="text-lg font-medium mb-6">
          Statement of Income (Gross Annual Income)
        </p>
        <div className="border-b border-gray-200 pb-6 mb-6">
          <FileUpload value={null} setValue={() => {}} />
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
            <Input placeholder="Enter Number" />
          </div>
          <div>
            <Label htmlFor="Commission">Commission</Label>
            <Input placeholder="Enter Number" />
          </div>
          <div>
            <Label htmlFor="Trade Income">Trade Income</Label>
            <Input placeholder="Enter Number" />
          </div>
          <div>
            <Label htmlFor="Allowance">Allowance</Label>
            <Input placeholder="Enter Number" />
          </div>
          <div>
            <Label htmlFor="Pension">Pension</Label>
            <Input placeholder="Enter Number" />
          </div>
          <div>
            <Label htmlFor="Annuity">Annuity</Label>
            <Input placeholder="Enter Number" />
          </div>
          <div>
            <Label htmlFor="Foreign Income">Foreign Income</Label>
            <Input placeholder="Enter Number" />
          </div>
          <div>
            <Label htmlFor="Interest">Interest</Label>
            <Input placeholder="Enter Number" />
          </div>
          <div>
            <Label htmlFor="Rent">Rent</Label>
            <Input placeholder="Enter Number" />
          </div>
        </div>
        <div className="flex items-center gap-16 mt-10">
          <p className="font-medium text-gray-700">Other Income(s)</p>
          <Button variant="link" className="text-[#0C7C10] text-base">
            <PlusCircleIcon color="#fff" fill="#0C7C10" />
            Add Income
          </Button>
        </div>
        <div className="flex flex-col gap-6 mt-10">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="Name">Name</Label>
              <Input placeholder="Enter Number" />
            </div>
            <div>
              <Label htmlFor="Amount">Amount</Label>
              <Input placeholder="Enter Number" />
            </div>
            <div className="flex flex-col justify-center">
              <Label htmlFor="Remove" className="invisible">
                Remove
              </Label>
              <Button variant="link" className="text-base w-fit">
                <XIcon />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-16 flex justify-end gap-6">
          <Button className="w-full max-w-[14rem] h-12" variant="outline">
            Save to Draft
          </Button>
          <Button className="w-full max-w-[14rem] h-12">Next</Button>
        </div>
      </div>
    </section>
  );
};

export default IncomePIT;
