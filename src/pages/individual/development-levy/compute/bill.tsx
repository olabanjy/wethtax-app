import TaxImplicationBill from "@/components/layout/tax-implication-bill";
import { useStore } from "@/store";
import dayjs from "dayjs";
import useUser from "@/hooks/use-user-type";

const DevelopmentLevyBill = () => {
  const tenant = useStore((s) => s.tenant);
  const { user } = useUser();


  const values = [
    {
      label: "Biller",
      value: tenant.acronym,
    },
    {
      label: "Issue Date",
      value: dayjs().format("DD/MM/YYYY"),
    },
    {
      label: "Tax Payer ID",
      value: user?.profile?.tax_payer_id,
    },
    {
      label: "Tax Year in View",
      value: "2024",
    },
    {
      label: "Customer Name",
      value: user?.profile?.first_name + " " + user?.profile?.last_name,
    },
    {
      label: "Phone Number",
      value: user?.profile?.phone_number,
    },
    {
      label: "Customer Email Address",
      value: user?.profile?.email,
    },
  ];

  return (
    <TaxImplicationBill
      title="Development Levy"
      values={values}
      amount="12,845.00"
      proceedLink="/individual/development-levy/success"
    />
  );
};

export default DevelopmentLevyBill;
