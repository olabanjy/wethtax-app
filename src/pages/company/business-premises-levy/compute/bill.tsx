import TaxImplicationBill from "@/components/layout/tax-implication-bill";
import { useStore } from "@/store";
import dayjs from "dayjs";
import useUser from "@/hooks/use-user-type";
import { useLocation } from "react-router-dom";
import { currentYear } from "@/constants/common";
import { formatter } from "@/lib/utils";

const BusinessPremisesLevyBill = () => {
  const tenant = useStore((s) => s.tenant);
  const { user } = useUser();
  const { state } = useLocation();
  const {
    year = currentYear,
    amount = "0.00",
    dateIssued,
  } = state ||
  ({} as { amountPaid: string; year: number; dateIssued?: string });

  const values = [
    {
      label: "Biller",
      value: tenant.acronym,
    },
    {
      label: "Issue Date",
      value: dateIssued ?? dayjs().format("DD/MM/YYYY"),
    },
    {
      label: "Tax Payer ID",
      value: user?.company_profile?.tax_payer_id,
    },
    {
      label: "Tax Year in View",
      value: year,
    },
    {
      label: "Customer Name",
      value: user?.company_profile?.name,
    },
    {
      label: "Phone Number",
      value: user?.company_profile?.phone_number ?? user?.phone_number,
    },
    {
      label: "Customer Email Address",
      value: user?.company_profile?.email ?? user?.email,
    },
  ];

  return (
    <TaxImplicationBill
      title="Business Premises Levy"
      values={values}
      amount={formatter.format(+amount)}
      proceedLink="/company/business-premises-levy/success"
    />
  );
};

export default BusinessPremisesLevyBill;
