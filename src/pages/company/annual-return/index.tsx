import { useMemo, useState } from "react";
import DataTable from "@/components/ui/data-table";
import type { TableColumn } from "@/components/ui/data-table";
import Tabs from "@/components/ui/tabs";
import { useFetch } from "@/hooks/use-fetch";

type AnnualReturnRow = {
  year: number;
  status: "Filled" | "Not Filled";
  actionHref: string;
};

const AnnualReturn = () => {
  const [activeTab, setActiveTab] = useState("annual");

  const endpointByTab: Record<string, string> = {
    annual:
      "/tenant/lagos/api/v1/returns/company/annual-returns/annual-returns/",
    projection:
      "/tenant/lagos/api/v1/returns/company/annual-returns/projection-returns/",
    withholding:
      "/tenant/lagos/api/v1/returns/company/annual-returns/witholding-tax/",
    schedule:
      "/tenant/lagos/api/v1/returns/company/annual-returns/schedule-returns/",
  };

  const normalizeRows = (resp: unknown): AnnualReturnRow[] => {
    const baseHref = `/company/annual-returns/file/${activeTab}`;
    // Support multiple API response shapes:
    // - Array
    // - { data: [...] }
    // - { results: [...], count, page, pages } (pagination)
    const items =
      (Array.isArray(resp)
        ? resp
        : (resp as { results?: unknown[] })?.results ??
          (resp as { data?: unknown[] })?.data) ?? [];

    if (!Array.isArray(items)) return [];

    return items.map((item: any) => {
      const createdDate = item?.createdAt ?? item?.created_at ?? item?.date ?? item?.updatedAt ?? new Date().toISOString();
      const derivedYear = Number(
        item?.year ??
          item?.company_return?.year ?? // schedule returns nested year
          item?.taxYear ??
          item?.tax_year ??
          String(createdDate).slice(0, 4)
      );
      return {
        year: Number.isFinite(derivedYear)
          ? derivedYear
          : new Date().getFullYear(),
        status: "Filled",
        actionHref: baseHref,
      } as AnnualReturnRow;
    });
  };

  const {
    data: rows = [],
    isLoading,
    isError,
  } = useFetch<AnnualReturnRow[]>(endpointByTab[activeTab], {
    select: normalizeRows,
    hideToast: "all",
    enabled: Boolean(endpointByTab[activeTab]),
  });

  const displayRows: AnnualReturnRow[] = useMemo(() => {
    if (isLoading) return [];
    const currentYear = new Date().getFullYear();
    const baseHref = `/company/annual-returns/file/${activeTab}`;
    const MIN_YEARS = 4;

    if (!rows || rows.length === 0) {
      return Array.from({ length: Math.max(5, MIN_YEARS) }, (_, i) => ({
        year: currentYear - i,
        status: "Not Filled" as const,
        actionHref: `${baseHref}?year=${currentYear - i}`,
      }));
    }

    const sorted = [...rows].sort((a, b) => b.year - a.year);

    if (sorted.length >= MIN_YEARS) return sorted;

    const existingYears = new Set(sorted.map((r) => r.year));
    const placeholders: AnnualReturnRow[] = [];
    for (let i = 0; sorted.length + placeholders.length < MIN_YEARS; i += 1) {
      const y = currentYear - i;
      if (!existingYears.has(y)) {
        placeholders.push({
          year: y,
          status: "Not Filled",
          actionHref: `${baseHref}?year=${y}`,
        });
      }
    }

    return [...sorted, ...placeholders].sort((a, b) => b.year - a.year);
  }, [rows, isLoading, activeTab]);

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
              : "View details"}
          </a>
        ),
        ignoreRowClick: true,
      },
    ],
    []
  );

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

        <DataTable
          columns={columns}
          data={displayRows}
          noDataText={
            isLoading
              ? "Loading..."
              : isError
              ? "Failed to load returns"
              : "No records to display"
          }
        />
      </div>
    </div>
  );
};

export default AnnualReturn;
