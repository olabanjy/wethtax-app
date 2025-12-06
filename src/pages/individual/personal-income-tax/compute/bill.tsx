import TaxImplicationBill from "@/components/layout/tax-implication-bill";
import { useFetch } from "@/hooks/use-fetch";
import { useSearchQuery } from "@/hooks/use-search-query";
import { useStore } from "@/store";
import type {
  IndividualReturn,
  IndividualReturnSummary,
} from "@/types/returns";
import dayjs from "dayjs";
import useUser from "@/hooks/use-user-type";
import { formatter } from "@/lib/utils";

const PITBill = () => {
  const { params } = useSearchQuery();
  const id = params.get("id");
  const tenant = useStore((s) => s.tenant);
  const { user } = useUser();

  const { data } = useFetch<IndividualReturn>(`/returns/individual/${id}/`);

  const { data: summary } = useFetch<{ data: IndividualReturnSummary }>(
    `/returns/individual/${id}/summary/`
  );

  const values = [
    {
      label: "Biller",
      value: summary?.data?.biller || tenant.acronym,
    },
    {
      label: "Issue Date",
      value: dayjs(summary?.data?.created_at || data?.created).format(
        "DD/MM/YYYY"
      ),
    },
    {
      label: "Tax Payer ID",
      value: summary?.data?.tax_payer_id || user?.profile?.tax_payer_id,
    },
    {
      label: "Tax Year in View",
      value: data?.year_in_view,
    },
    {
      label: "Customer Name",
      value:
        summary?.data?.customer_name ||
        data?.accommodation?.owner_name ||
        user?.first_name + " " + user?.last_name,
    },
    {
      label: "Phone Number",
      value:
        summary?.data?.phone_number ||
        user?.profile?.phone_number_1 ||
        user?.phone_number,
    },
    {
      label: "Customer Email Address",
      value:
        summary?.data?.email_address ||
        user?.profile?.email_address ||
        user?.profile?.email,
    },
  ];

  return (
    <TaxImplicationBill
      title="Personal Income Tax"
      values={values}
      amount={formatter.format(+(summary?.data?.amount || 0))}
    />
  );
};

export default PITBill;
