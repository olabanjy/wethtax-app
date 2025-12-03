import DataTable, { type TableColumn } from "@/components/ui/data-table";
import { previousYear } from "@/constants/common";
import { useMemo } from "react";
import { Link } from "react-router-dom";

type CapitalGainsTaxRow = {
  year: number;
  status: string;
  disposedAsset: string;
  actionHref: string;
  label: string;
};

const getTableAction = (year: number, returnExists?: { id: string }) => {
  if (!returnExists) {
    return {
      actionHref: `/company/capital-gains-tax/compute?year=${year}`,
      label: "Click to file return",
      status: "Not Filled",
    };
  }

  return {
    actionHref: `#`,
    label: "Click to generate TCC",
    status: "Filled",
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
        selector: (row) => row.status,
      },
      {
        name: "Disposed Asset",
        selector: (row) => row.disposedAsset || '--',
      },
      {
        name: "Action",
        width: "180px",
        cell: (row) => (
          <Link
            to={row.actionHref}
            className="text-[#7879C5] hover:underline shrink-0 text-left"
          >
            {row.label}
          </Link>
        ),
        ignoreRowClick: true,
      },
    ],
    []
  );

  //   const { data: returns } = useFetch<IndividualReturnsList>(
  //     "/returns/individual/",
  //     {
  //       hideToast: "success",
  //     }
  //   );

  const data: CapitalGainsTaxRow[] = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => {
      const year = previousYear - index;
      //   const returnExists = returns?.results?.find(
      //     (r) => r.year_in_view === year
      //   );
      return {
        year,
        disposedAsset: "--",
        ...getTableAction(year, undefined),
      };
    });
  }, []);

  return (
    <div className="w-full space-y-10">
      <h1 className="text-xl font-[600] text-[#121212]">Capital Gain Tax</h1>

      <DataTable pagination={false} columns={columns} data={data} />
    </div>
  );
};

export default CapitalGainsTax;
