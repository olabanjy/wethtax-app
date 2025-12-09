import TaxImplicationBill from "@/components/layout/tax-implication-bill";
import { currentYear } from "@/constants/common";
import { useFetch } from "@/hooks/use-fetch";
import useUser from "@/hooks/use-user-type";
import { useStore } from "@/store";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { formatter } from "@/lib/utils";

const CompanyMonthlyPayeSummary = () => {
  const { id } = useParams();
  const { user } = useUser();
  const tenant = useStore((s) => s.tenant);

  const { data } = useFetch<any>(
    id ? `/returns/company/monthly-returns/${id}/monthly-payee/summary/` : "",
    {
      hideToast: "all",
      enabled: Boolean(id),
      retry: 1,
      select: (d) => (d as any)?.data ?? d,
    }
  );

  const issuedAt = (data as any)?.created_at ?? new Date().toISOString();
  const amount = (data as any)?.amount ?? "0.00";
  const year = dayjs(issuedAt).isValid() ? dayjs(issuedAt).year() : currentYear;
  const month = (data as any)?.month ?? "";
  const reference = (data as any)?.phone_number ?? "";
  const numEmployees = (data as any)?.num_employees ?? undefined;

  const values = [
    { label: "Biller", value: tenant?.acronym || "" },
    { label: "Issue Date", value: dayjs(issuedAt).format("DD/MM/YYYY") },
    { label: "Tax Payer ID", value: user?.company_profile?.tax_payer_id || "" },
    { label: "Tax Year in View", value: String(year) },
    { label: "Month", value: String(month) },
    { label: "Phone Number", value: String(reference || "--") },
    {
      label: "No. of Employees",
      value: numEmployees != null ? String(numEmployees) : "--",
    },
  ];

  return (
    <TaxImplicationBill
      title="Monthly PAYE"
      values={values}
      amount={formatter.format(+amount)}
      proceedLink="/company/monthly-paye"
    />
  );
};

export default CompanyMonthlyPayeSummary;
