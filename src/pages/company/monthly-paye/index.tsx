import clsx from "clsx";
import { useMemo, useState } from "react";
import DataTable from "@/components/ui/data-table";
import type { TableColumn } from "@/components/ui/data-table";
import YearSelect from "@/modules/dashboard/home/common/year-select";
import { Link } from "react-router-dom";

type MonthlyPayeRow = {
  month: string;
  amount?: string;
  referenceNo?: string;
  numEmployees?: number;
  status: "Filled" | "Not Filled";
};

const MonthlyPAYE = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());

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
              row.status === "Not Filled" ? "/company/monthly-paye/file" : "#"
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
    []
  );

  const data: MonthlyPayeRow[] = useMemo(
    () => [
      {
        month: "April",
        status: "Not Filled",
      },
      {
        month: "March",
        amount: "₦100,000",
        referenceNo: "26542736",
        numEmployees: 35,
        status: "Not Filled",
      },
      {
        month: "February",
        amount: "₦100,000",
        referenceNo: "26542736",
        numEmployees: 12,
        status: "Filled",
      },
      {
        month: "January",
        amount: "₦100,000",
        referenceNo: "26542736",
        numEmployees: 15,
        status: "Filled",
      },
    ],
    []
  );

  return (
    <div className="w-full space-y-10">
      <div className={clsx("w-full flex items-center gap-4")}>
        <h1 className="text-xl font-[600] text-[#121212]">Monthly PAYE</h1>

        <YearSelect label="" year={year} onChange={setYear} />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default MonthlyPAYE;
