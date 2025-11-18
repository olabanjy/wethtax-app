import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import SubmitButtonGroup from "@/components/ui/submit-button-group";
import { useState } from "react";

const AccommodationPIT = () => {
  const [calculating, setCalculating] = useState(false);

  return (
    <section>
      <p className="text-lg font-medium mb-10">
        Mandatory Disclosure of Accommodation
      </p>
      <div>
        <Label htmlFor="Address">Address</Label>
        <Input placeholder="Enter Address" />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 my-6">
        <div>
          <Label htmlFor="Accommodation Type">Accommodation Type</Label>
          <Input placeholder="Enter Accommodation Type" />
        </div>
        <div>
          <Label htmlFor="Ownership Type">Ownership Type</Label>
          <Select
            options={[
              {
                label: "Tenant",
                value: "Tenant",
              },
              {
                label: "Landlord",
                value: "Landlord",
              },
              {
                label: "Others",
                value: "Others",
              },
            ]}
            placeholder="Select Ownership Type"
          />
        </div>
        <div>
          <Label htmlFor="Owner Name">Owner Name</Label>
          <Input placeholder="Enter Name" />
        </div>
        <div>
          <Label htmlFor="Owner Tax ID">Owner Tax ID</Label>
          <Input placeholder="Enter Tax ID" />
        </div>
      </div>
      <div>
        <Label htmlFor="Owner Address">Owner Address</Label>
        <Input placeholder="Enter Address" />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 my-6">
        <div>
          <Label htmlFor="Rent Paid">Rent Paid</Label>
          <Input placeholder="Enter Amount" />
        </div>
        <div>
          <Label htmlFor="Rent Paid By Employer">Rent Paid By Employer</Label>
          <Input placeholder="Enter Amount" />
        </div>
        <div>
          <Label htmlFor="Start Date">Start Date</Label>
          <DatePicker placeholder="Enter Start Date" />
        </div>
        <div>
          <Label htmlFor="End Date">End Date</Label>
          <DatePicker placeholder="Enter End Date" />
        </div>
      </div>
      <SubmitButtonGroup 
        firstButtonProps={{
          children: "Save to Draft",
          variant: "outline",
        }}
        secondButtonProps={{
          children: "Next",
          onClick: () => setCalculating(true),
        }}
      />
      <Dialog open={calculating} onOpenChange={setCalculating}>
        <DialogContent className="gap-6 bg-white justify-center items-center py-10">
          <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
            <img src="/assets/svgs/calculator.svg" alt="" />
          </div>
          <p className="text-center font-medium text-xl">Calculating Tax Implication...</p>
          <div className="flex gap-2 mx-auto">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-${index * 100}`}
              />
            ))}
          </div>
          <Button className="max-w-[14rem] mx-auto w-full">Continue</Button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AccommodationPIT;
