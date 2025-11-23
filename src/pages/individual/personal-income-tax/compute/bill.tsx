import TaxImplicationBill from "@/components/layout/tax-implication-bill";
import { useFetch } from "@/hooks/use-fetch";
import { useSearchQuery } from "@/hooks/use-search-query";
import { useStore } from "@/store";
import type { IndividualReturn } from "@/types/returns";
import dayjs from "dayjs";
import useUser from "@/hooks/use-user-type";

const PITBill = () => {
  const { params } = useSearchQuery();
  const id = params.get("id");
  const tenant = useStore((s) => s.tenant);
  const { user } = useUser();

  const { data } = useFetch<IndividualReturn>(`/returns/individual/${id}/`);

  const values = [
    {
      label: "Biller",
      value: tenant.acronym,
    },
    {
      label: "Issue Date",
      value: dayjs(data?.created).format("DD/MM/YYYY"),
    },
    {
      label: "Tax Payer ID",
      value: user?.profile?.tax_payer_id,
    },
    {
      label: "Tax Year in View",
      value: data?.year_in_view,
    },
    {
      label: "Customer Name",
      value: data?.accommodation?.owner_name,
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
      title="Personal Income Tax"
      values={values}
      amount="12,845.00"
    />
  );
};

export default PITBill;
