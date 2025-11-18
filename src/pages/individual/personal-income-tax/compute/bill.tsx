import TaxImplicationBill from "@/components/layout/tax-implication-bill";

const PITBill = () => {
  const values = [
    {
      label: "Biller",
      value: "LIRS",
    },
    {
      label: "Issue Date",
      value: "11/11/2024",
    },
    {
      label: "Tax Payer ID",
      value: "473642",
    },
    {
      label: "Tax Month in View",
      value: "April",
    },
    {
      label: "Customer Name",
      value: "John Doe",
    },
    {
      label: "Phone Number",
      value: "+234 123 456 7890",
    },
    {
      label: "Customer Email Address",
      value: "john.doe@example.com",
    },
  ];

  return (
    <TaxImplicationBill
      title="Personal Income Tax"
      values={values}
      amount="12,845.00"
    />
  );
};

export default PITBill;
