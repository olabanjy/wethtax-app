import DataTable, { type TableColumn } from "@/components/ui/data-table";
import { previousYear } from "@/constants/common";
import { useFetch } from "@/hooks/use-fetch";
import { cn } from "@/lib/utils";
import type {
  IndividualDevelopmentLevy as TIndividualDevelopmentLevy,
  IndividualDevelopmentLevyReturnList,
} from "@/types/returns";
import { useMemo } from "react";
import { Link } from "react-router-dom";

type IndividualDevelopmentLevyRow = {
  year: number;
  status: string;
  actionHref: string;
  label: string;
  state?: unknown;
  className?: string;
};

const getTableAction = (
  year: number,
  returnExists?: TIndividualDevelopmentLevy
) => {
  if (!returnExists) {
    return {
      actionHref: `/individual/development-levy/compute?year=${year}`,
      label: "Click to file return",
      status: "Not Filled",
      className: "text-red-500",
    };
  }

  return {
    actionHref: `/individual/development-levy/compute/bill`,
    label: "View summary",
    status: "Filled",
    state: {
      year,
      amount: returnExists.amount_paid,
      dateIssued: returnExists.created.split("T")[0],
    },
  };
};

const IndividualDevelopmentLevy = () => {
  const columns: TableColumn<IndividualDevelopmentLevyRow>[] = useMemo(
    () => [
      {
        name: "Year",
        selector: (row) => row.year,
      },
      {
        name: "Status",
        cell: (row) => <span className={cn(row.className)}>{row.status}</span>,
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

  const { data: returns, isFetching } =
    useFetch<IndividualDevelopmentLevyReturnList>(
      "/returns/individual/development-levy/",
      {
        hideToast: "success",
      }
    );

  const data: IndividualDevelopmentLevyRow[] = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => {
      const year = previousYear - index;
      const returnExists = returns?.results?.find(
        (r) => r.individual_return.year_in_view === year
      );
      return {
        year,
        ...getTableAction(year, returnExists),
      };
    });
  }, [returns]);

  return (
    <div className="w-full space-y-10">
      <h1 className="text-xl font-[600] text-[#121212]">Development Levy</h1>

      <DataTable
        pagination={false}
        columns={columns}
        data={data}
        tableProps={{ progressPending: isFetching }}
      />
    </div>
  );
};

export default IndividualDevelopmentLevy;
