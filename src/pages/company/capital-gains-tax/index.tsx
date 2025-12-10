import DataTable, { type TableColumn } from "@/components/ui/data-table";
import { previousYear } from "@/constants/common";
import { useFetch } from "@/hooks/use-fetch";
import type {
  CapitalGainsTax as TCapitalGainsTax,
  CapitalGainsTaxReturnList,
} from "@/types/returns";
import { useMemo } from "react";
import { Link } from "react-router-dom";

type CapitalGainsTaxRow = {
  year: number;
  status: string;
  disposedAsset: string;
  actionHref: string;
  label: string;
  state?: unknown;
  className?: string;
};

const getTableAction = (year: number, returnExists?: TCapitalGainsTax) => {
  if (!returnExists) {
    return {
      actionHref: `/company/capital-gains-tax/compute?year=${year}`,
      label: "Click to file return",
      status: "Not Filled",
      className: "text-red-500",
    };
  }

  return {
    actionHref: `/company/capital-gains-tax/compute/bill`,
    label: "View summary",
    status: "Filled",
    disposedAsset: returnExists.asset,
    state: {
      year,
      amount: returnExists.amount_paid,
      dateIssued: returnExists.created.split("T")[0],
    },
  };
};

const CapitalGainsTax = () => {
  const columns: TableColumn<CapitalGainsTaxRow>[] = useMemo(
    () => [
      {
        name: "Year",
        selector: (row) => row.year,
      },
      {
        name: "Status",
        cell: (row) => <span className={row.className}>{row.status}</span>,
      },
      {
        name: "Disposed Asset",
        selector: (row) => row.disposedAsset || "--",
      },
      {
        name: "Action",
        width: "180px",
        cell: (row) => (
          <Link
            to={row.actionHref}
            className="text-[#7879C5] hover:underline shrink-0 text-left"
            state={row.state}
          >
            {row.label}
          </Link>
        ),
        ignoreRowClick: true,
      },
    ],
    []
  );

  const { data: returns, isFetching } = useFetch<CapitalGainsTaxReturnList>(
    "/returns/company/annual-returns/capital-gain/",
    {
      hideToast: "success",
    }
  );

  const data: CapitalGainsTaxRow[] = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => {
      const year = previousYear - index;
      const returnExists = returns?.results?.find(
        (r) => r.company_return.year === year
      );
      return {
        year,
        disposedAsset: "--",
        ...getTableAction(year, returnExists),
      };
    });
  }, [returns]);

  return (
    <div className="w-full space-y-10">
      <h1 className="text-xl font-[600] text-[#121212]">Capital Gain Tax</h1>

      <DataTable
        pagination={false}
        columns={columns}
        data={data}
        tableProps={{ progressPending: isFetching }}
      />
    </div>
  );
};

export default CapitalGainsTax;
