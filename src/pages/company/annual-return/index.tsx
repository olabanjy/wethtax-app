import { useMemo, useState } from "react";
import DataTable from "@/components/ui/data-table";
import type { TableColumn } from "@/components/ui/data-table";
import Tabs from "@/components/ui/tabs";

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

  const [activeTab, setActiveTab] = useState("annual");

  const data: AnnualReturnRow[] = useMemo(() => {
    const baseHref = `/company/annual-returns/file/${activeTab}`;
    return [
      {
        year: 2025,
        status: "Not Filled",
        actionHref: baseHref,
      },
      {
        year: 2024,
        status: "Not Filled",
        actionHref: baseHref,
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
    ];
  }, [activeTab]);

  return (
    <div className="w-full space-y-10">
      <h1 className="text-xl font-[600] text-[#121212]">Annual Returns</h1>

      <div className="w-full flex flex-col gap-6">
        <Tabs
          items={[
            { label: "Annual Returns", value: "annual" },
            { label: "Projection Returns", value: "projection" },
            { label: "Withholding Tax", value: "withholding" },
            { label: "Schedule Returns", value: "schedule" },
          ]}
          value={activeTab}
          onChange={setActiveTab}
        />

        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AnnualReturn;
