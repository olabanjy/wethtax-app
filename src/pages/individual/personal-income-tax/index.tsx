import DataTable, { type TableColumn } from "@/components/ui/data-table";
import { useMemo } from "react";
import { Link } from "react-router-dom";

type PersonalIncomeTaxRow = {
  year: number;
  status: "Filled" | "Not Filled";
  actionHref: string;
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
            {row.status === "Not Filled"
              ? "Click to file return"
              : "Click to generate TCC"}
          </Link>
        ),
        ignoreRowClick: true,
      },
    ],
    []
  );

  const data: PersonalIncomeTaxRow[] = useMemo(
    () => [
      {
        year: 2025,
        status: "Not Filled",
        actionHref: "/individual/personal-income-tax/compute?year=2025",
      },
      {
        year: 2024,
        status: "Not Filled",
        actionHref: "/individual/personal-income-tax/compute?year=2024",
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
      <h1 className="text-xl font-[600] text-[#121212]">Personal Income Tax</h1>

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PersonalIncomeTax;
