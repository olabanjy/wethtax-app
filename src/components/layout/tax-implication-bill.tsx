import { useState } from "react";
import SubmitButtonGroup from "../ui/submit-button-group";
import { Dialog, DialogContent } from "../ui/dialog";
import { useNavigate } from "react-router-dom";

const TaxImplicationBill = ({
  title,
  values,
  amount,
}: {
  title: string;
  values: Array<{ label: string; value: string }>;
  amount: string;
}) => {
  const navigate = useNavigate();
  const [openCheckModal, setopenCheckModal] = useState(false);

  return (
    <section>
      <p className="text-gray-700 mb-10 text-xl font-medium">
        Tax Implication Bill
      </p>
      <p className="text-gray-700 mb-4 text-lg font-medium">
        Bill: <span>{title}</span>
      </p>
      <section className="border border-gray-300 rounded-xl py-9 px-7">
        <div className="grid grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="pb-3.5 border-b">
              <p className="text-gray-500 text-sm">{value.label}</p>
              <p className="text-gray-700 text-lg font-medium">{value.value}</p>
            </div>
          ))}
        </div>
        <h4 className="text-gray-700 text-2xl font-medium mt-10">
          Amount Due: ₦{amount}
        </h4>
      </section>
      <SubmitButtonGroup
        firstButtonProps={{
          children: "Cancel",
        }}
        secondButtonProps={{
          children: "Continue",
          onClick: () => setopenCheckModal(true),
        }}
      />
      <Dialog open={openCheckModal} onOpenChange={setopenCheckModal}>
        <DialogContent className="items-center justify-center gap-0 py-20 px-14">
          <img
            src="/assets/svgs/warning.svg"
            alt=""
            className="w-20 h-16 mx-auto mb-6"
          />
          <h4 className="text-2xl text-center font-semibold text-gray-800 mb-4">
            Crosscheck your entries
          </h4>
          <p className="text-center text-gray-600">
            Check all your information before you proceed because you will not
            be able to edit your entries after submitting
          </p>
          <SubmitButtonGroup
            className="mt-12 gap-3 justify-center"
            firstButtonProps={{
              children: "Cancel",
              className: "w-1/2 max-w-full",
              onClick: () => setopenCheckModal(false),
            }}
            secondButtonProps={{
              children: "Continue",
              className: "w-1/2 max-w-full",
              onClick: () => navigate(`/individual/personal-income-tax/success`),
            }}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TaxImplicationBill;
