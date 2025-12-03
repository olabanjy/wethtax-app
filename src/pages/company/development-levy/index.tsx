import DataTable, { type TableColumn } from "@/components/ui/data-table";
import { previousYear } from "@/constants/common";
import { useMemo } from "react";
import { Link } from "react-router-dom";

type CompanyDevelopmentLevyRow = {
  year: number;
  status: string;
  actionHref: string;
  label: string;
};

const getTableAction = (year: number, returnExists?: { id: string }) => {
  if (!returnExists) {
    return {
      actionHref: `/company/development-levy/compute?year=${year}`,
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

const CompanyDevelopmentLevy = () => {
  const columns: TableColumn<CompanyDevelopmentLevyRow>[] = useMemo(
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

  const data: CompanyDevelopmentLevyRow[] = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => {
      const year = previousYear - index;
      //   const returnExists = returns?.results?.find(
      //     (r) => r.year_in_view === year
      //   );
      return {
        year,
        ...getTableAction(year, undefined),
      };
    });
  }, []);

  return (
    <div className="w-full space-y-10">
      <h1 className="text-xl font-[600] text-[#121212]">Development Levy</h1>

      <DataTable pagination={false} columns={columns} data={data} />
    </div>
  );
};

export default CompanyDevelopmentLevy;
