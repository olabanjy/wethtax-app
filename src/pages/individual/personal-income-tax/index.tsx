import DataTable, { type TableColumn } from "@/components/ui/data-table";
import { previousYear } from "@/constants/common";
import { useFetch } from "@/hooks/use-fetch";
import type { IndividualReturn, IndividualReturnsList } from "@/types/returns";
import { useMemo } from "react";
import { Link } from "react-router-dom";

type PersonalIncomeTaxRow = {
  year: number;
  status: string;
  actionHref: string;
  label: string;
};

const getTableAction = (year: number, returnExists?: IndividualReturn) => {
  if (!returnExists) {
    return {
      actionHref: `/individual/personal-income-tax/compute?year=${year}`,
      label: "Click to file return",
      status: "Not Filled",
    };
  }

  if (!returnExists.income) {
    return {
      actionHref: `/individual/personal-income-tax/compute/income?id=${returnExists.id}`,
      label: "Click to continue",
      status: "Filled (Incomplete)",
    };
  }

  if (!returnExists.accommodation) {
    return {
      actionHref: `/individual/personal-income-tax/compute/accommodation?id=${returnExists.id}`,
      label: "Click to continue",
      status: "Filled (Incomplete)",
    };
  }

  return {
    actionHref: `/individual/personal-income-tax/compute/bill?id=${returnExists.id}`,
    label: "Click to generate TCC",
    status: "Filled",
  };
};

const PersonalIncomeTax = () => {
  const columns: TableColumn<PersonalIncomeTaxRow>[] = useMemo(
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

  const { data: returns, isLoading } = useFetch<IndividualReturnsList>(
    "/returns/individual/",
    {
      hideToast: "success",
    }
  );

  const data: PersonalIncomeTaxRow[] = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => {
      const year = previousYear - index;
      const returnExists = returns?.results?.find(
        (r) => r.year_in_view === year
      );
      return {
        year,
        ...getTableAction(year, returnExists),
      };
    });
  }, [returns]);

  return (
    <div className="w-full space-y-10">
      <h1 className="text-xl font-[600] text-[#121212]">Personal Income Tax</h1>

      <DataTable
        pagination={false}
        columns={columns}
        data={data}
        tableProps={{ progressPending: isLoading }}
      />
    </div>
  );
};

export default PersonalIncomeTax;
