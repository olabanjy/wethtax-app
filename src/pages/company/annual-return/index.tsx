import { useMemo } from "react";
import DataTable from "@/components/ui/data-table";
import type { TableColumn } from "@/components/ui/data-table";

type AnnualReturnRow = {
  year: number;
  status: "Filled" | "Not Filled";
  actionHref: string;
};

const AnnualReturn = () => {
  const columns: TableColumn<AnnualReturnRow>[] = useMemo(
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
          <a
            href={row.actionHref}
            className="text-[#7879C5] hover:underline shrink-0 text-left"
          >
            {row.status === "Not Filled"
              ? "Click to file return"
              : "View history"}
          </a>
        ),
        ignoreRowClick: true,
      },
    ],
    []
  );

  const data: AnnualReturnRow[] = useMemo(
    () => [
      {
        year: 2025,
        status: "Not Filled",
        actionHref: "#",
      },
      {
        year: 2024,
        status: "Not Filled",
        actionHref: "#",
      },
      {
        year: 2023,
        status: "Filled",
        actionHref: "#",
      },
      {
        year: 2022,
        status: "Filled",
        actionHref: "#",
      },
    ],
    []
  );

  return (
    <div className="w-full space-y-10">
      <h1 className="text-xl font-[600] text-[#121212]">Annual Returns</h1>

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AnnualReturn;
