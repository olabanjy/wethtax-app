import { useState } from "react";
import SubmitButtonGroup from "../ui/submit-button-group";
import { useNavigate } from "react-router-dom";
import CrosscheckDialog from "../ui/crosscheck-dialog";

const TaxImplicationBill = ({
  title,
  values,
  amount,
  proceedLink = "/individual/personal-income-tax/success",
}: {
  title: string;
  values: Array<{ label: string; value: string }>;
  amount: string;
  proceedLink?: string;
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
              <p className="text-gray-700 text-lg font-medium break-all">{value.value || '--'}</p>
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
          onClick: () => navigate(-1),
        }}
        secondButtonProps={{
          children: "Continue",
          onClick: () => setopenCheckModal(true),
        }}
      />
      <CrosscheckDialog
        open={openCheckModal}
        toggle={() => setopenCheckModal(!openCheckModal)}
        onProceed={() => navigate(proceedLink)}
      />
    </section>
  );
};

export default TaxImplicationBill;
