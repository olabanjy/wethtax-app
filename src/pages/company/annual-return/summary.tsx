import TaxImplicationBill from "@/components/layout/tax-implication-bill";
import { currentYear } from "@/constants/common";
import { useFetch } from "@/hooks/use-fetch";
import useUser from "@/hooks/use-user-type";
import { useStore } from "@/store";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { formatter } from "@/lib/utils";

const CompanyAnnualReturnSummary = () => {
  const { id } = useParams();
  const { user } = useUser();
  const tenant = useStore((s) => s.tenant);

  const { data } = useFetch<any>(
    id ? `/returns/company/annual-returns/${id}/` : "",
    {
      hideToast: "all",
      enabled: Boolean(id),
      retry: 1,
      select: (d) => (d as any)?.data ?? d,
    }
  );

  const issuedAt =
    (data as any)?.created_at ||
    (data as any)?.issued_at ||
    (data as any)?.date ||
    new Date().toISOString();
  const amount =
    (data as any)?.amount_due ??
    (data as any)?.amount ??
    (data as any)?.total_amount ??
    "0.00";
  const year = dayjs(issuedAt).isValid()
    ? dayjs(issuedAt).year()
    : (data as any)?.year ?? currentYear;
  const reference =
    (data as any)?.reference ??
    (data as any)?.reference_no ??
    (data as any)?.receipt_no ??
    "";
  const companyName =
    (data as any)?.company_name ?? user?.company_profile?.name ?? "";
  const taxPayerId =
    (data as any)?.tax_payer_id ?? user?.company_profile?.tax_payer_id ?? "";
  const phoneNumber =
    (data as any)?.phone_number ?? user?.company_profile?.phone_number ?? "";
  const emailAddress =
    (data as any)?.email_address ?? user?.company_profile?.email ?? "";

  const values = [
    { label: "Biller", value: tenant?.acronym || "" },
    { label: "Issue Date", value: dayjs(issuedAt).format("DD/MM/YYYY") },
    { label: "Company Name", value: companyName },
    { label: "Tax Payer ID", value: taxPayerId },
    { label: "Tax Year in View", value: String(year) },
    { label: "Reference No", value: String(reference || "--") },
    { label: "Phone Number", value: String(phoneNumber || "--") },
    { label: "Email Address", value: String(emailAddress || "--") },
  ];

  return (
    <TaxImplicationBill
      title="Annual Returns"
      values={values}
      amount={formatter.format(+amount)}
      proceedLink="/company/annual-returns"
    />
  );
};

export default CompanyAnnualReturnSummary;
