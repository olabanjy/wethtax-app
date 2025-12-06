import TaxImplicationBill from "@/components/layout/tax-implication-bill";
import { useStore } from "@/store";
import dayjs from "dayjs";
import useUser from "@/hooks/use-user-type";
import { useLocation } from "react-router-dom";
import { currentYear } from "@/constants/common";
import { formatter } from "@/lib/utils";

const IndividualDevelopmentLevyBill = () => {
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
      value: dayjs(dateIssued).format("DD/MM/YYYY"),
    },
    {
      label: "Tax Payer ID",
      value: user?.profile?.tax_payer_id,
    },
    {
      label: "Tax Year in View",
      value: year,
    },
    {
      label: "Customer Name",
      value: user?.first_name + " " + user?.last_name,
    },
    {
      label: "Phone Number",
      value: user?.profile?.phone_number_1 ?? user?.phone_number,
    },
    {
      label: "Customer Email Address",
      value: user?.profile?.email_address ?? user?.email,
    },
  ];

  return (
    <TaxImplicationBill
      title="Development Levy"
      values={values}
      amount={formatter.format(+amount)}
      proceedLink="/individual/development-levy/success"
    />
  );
};

export default IndividualDevelopmentLevyBill;
