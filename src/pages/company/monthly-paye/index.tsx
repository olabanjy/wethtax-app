import clsx from "clsx";
import { useMemo, useState } from "react";
import DataTable from "@/components/ui/data-table";
import type { TableColumn } from "@/components/ui/data-table";
import YearSelect from "@/modules/dashboard/home/common/year-select";
import { Link } from "react-router-dom";
import { useFetch } from "@/hooks/use-fetch";

type MonthlyPayeRow = {
  month: string;
  amount?: string;
  referenceNo?: string;
  numEmployees?: number;
  status: "Filled" | "Not Filled";
};

const MonthlyPAYE = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const { data: apiData, isLoading } = useFetch<{
    results?: Array<Record<string, unknown>>;
  }>("/returns/company/monthly-returns/", {
    params: { year },
    hideToast: "success",
    retry: 1,
  });

  const rows: MonthlyPayeRow[] = useMemo(() => {
    const allMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const now = new Date();
    const isCurrentYear = year === now.getFullYear();
    const monthsToShow = isCurrentYear ? now.getMonth() : 12;

    const items = apiData?.results ?? [];
    const monthToItem = new Map<string, Record<string, unknown>>();
    for (const item of items) {
      const m = String(item?.["month"] ?? "").toUpperCase();
      if (m) monthToItem.set(m, item);
    }

    const computed: MonthlyPayeRow[] = [];
    for (let i = 0; i < monthsToShow; i++) {
      const monthName = allMonths[i];
      const backendKey = monthName.toUpperCase();
      const match = monthToItem.get(backendKey);
      const amount =
        match?.["amount"] != null ? String(match["amount"]) : undefined;
      const referenceNo =
        match?.["reference"] != null ? String(match["reference"]) : undefined;
      const status: "Filled" | "Not Filled" = match ? "Filled" : "Not Filled";
      computed.push({
        month: monthName,
        amount,
        referenceNo,
        status,
      });
    }

    return computed.reverse();
  }, [apiData?.results, year]);

  const columns: TableColumn<MonthlyPayeRow>[] = useMemo(
    () => [
      {
        name: "Month",
        selector: (row) => row.month,
      },
      {
        name: "Amount",
        selector: (row) => row.amount ?? "--",
      },
      {
        name: "Reference No",
        selector: (row) => row.referenceNo ?? "--",
      },
      {
        name: "No of Employees",
        selector: (row) =>
          row.numEmployees != null ? String(row.numEmployees) : "--",
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
            to={
              row.status === "Not Filled"
                ? `/company/monthly-paye/file?month=${row.month}&year=${year}`
                : "#"
            }
            className="text-[#7879C5] hover:underline shrink-0 text-left"
          >
            {row.status === "Not Filled"
              ? "Click to file return"
              : "View history"}
          </Link>
        ),
        ignoreRowClick: true,
      },
    ],
    [year]
  );

  return (
    <div className="w-full space-y-10">
      <div className={clsx("w-full flex items-center gap-4")}>
        <h1 className="text-xl font-[600] text-[#121212]">Monthly PAYE</h1>

        <YearSelect label="" year={year} onChange={setYear} />
      </div>

      <DataTable
        columns={columns}
        data={rows}
        tableProps={{ progressPending: isLoading }}
      />
    </div>
  );
};

export default MonthlyPAYE;
