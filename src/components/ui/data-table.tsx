import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DataTableLib from "react-data-table-component";
import type { TableColumn, TableStyles } from "react-data-table-component";
import type { ReactNode } from "react";

export type { TableColumn };

type SimplePaginationProps = {
  currentPage: number;
  rowsPerPage: number;
  rowCount: number;
  onChangePage: (page: number, totalRows: number) => void;
  onChangeRowsPerPage?: (newPerPage: number, page: number) => void;
};

const SimplePagination = ({
  currentPage,
  rowsPerPage,
  rowCount,
  onChangePage,
}: SimplePaginationProps) => {
  const start = rowCount === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, rowCount);
  const canPrev = currentPage > 1;
  const totalPages = Math.max(1, Math.ceil(rowCount / rowsPerPage));
  const canNext = currentPage < totalPages;

  return (
    <div className="w-full flex items-center justify-end gap-4 py-3 px-2 mt-4">
      <p className="text-xs text-[#2A2A2A]">{`Showing ${start}-${end} of ${rowCount}`}</p>

      <button
        type="button"
        onClick={() => canPrev && onChangePage(currentPage - 1, rowCount)}
        disabled={!canPrev}
        className={clsx(
          "h-4 w-4 grid place-items-center rounded disabled:opacity-50",
          "cursor-pointer disabled:cursor-not-allowed"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      <button
        type="button"
        onClick={() => canNext && onChangePage(currentPage + 1, rowCount)}
        disabled={!canNext}
        className={clsx(
          "h-4 w-4 grid place-items-center rounded disabled:opacity-50",
          "cursor-pointer disabled:cursor-not-allowed"
        )}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

const defaultStyles: TableStyles = {
  table: {
    style: {
      backgroundColor: "transparent",
    },
  },
  headRow: {
    style: {
      minHeight: "42px",
      borderBottom: "1px solid #D0D0D0",
      backgroundColor: "#D0D0D0",
    },
  },
  headCells: {
    style: {
      color: "#2A2A2A",
      fontSize: "16px",
      fontWeight: 500,
    },
  },
  rows: {
    style: {
      minHeight: "48px",
      borderBottom: "1px solid #D0D0D0",
      backgroundColor: "transparent",
    },
  },
  cells: {
    style: {
      color: "#414141",
      fontSize: "15px",
      backgroundColor: "transparent",
    },
  },
  pagination: {
    style: {
      borderTop: "none",
    },
  },
};

export type DataTableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  noDataText?: string | ReactNode;
  pagination?: boolean;
  tableProps?: Record<string, unknown>;
  highlightOnHover?: boolean;
};

export function DataTable<T>({
  columns,
  data,
  className,
  noDataText = "No records to display",
  pagination = true,
  tableProps,
  highlightOnHover = false,
}: DataTableProps<T>) {
  return (
    <div className={clsx("w-full", className)}>
      <DataTableLib
        columns={columns}
        data={data}
        customStyles={defaultStyles}
        noDataComponent={
          <div className="py-8 text-sm text-[#717171]">{noDataText}</div>
        }
        pagination={pagination}
        paginationComponent={SimplePagination}
        paginationRowsPerPageOptions={[4, 10, 25, 50]}
        highlightOnHover={highlightOnHover}
        {...(tableProps ?? {})}
      />
    </div>
  );
}

export default DataTable;
