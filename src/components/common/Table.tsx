"use client";

import {
  ColumnDef,
  SortingState,
  PaginationState,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropdownCircle, IoMdArrowDropup, IoMdArrowDropupCircle } from "react-icons/io";

export interface CommonTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];

  loading?: boolean;

  pageIndex?: number;
  pageSize?: number;
  totalRows?: number;

  onPaginationChange?: (pagination: PaginationState) => void;
  onSortingChange?: (sorting: SortingState) => void;

  enableSorting?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
}

export default function CommonTable<T>({
  data,
  columns,
  loading = false,
  pageIndex = 0,
  pageSize = 10,
  totalRows,
  onPaginationChange,
  onSortingChange,
  enableSorting = true,
  enablePagination = true,
  enableRowSelection = false,
}: CommonTableProps<T>) {
  "use no memo";

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex,
    pageSize,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const isManualPagination = totalRows !== undefined;
  const pageCount = isManualPagination
    ? Math.max(Math.ceil(totalRows / pagination.pageSize), 1)
    : undefined;

  useEffect(() => {
    setPagination({
      pageIndex,
      pageSize,
    });
  }, [pageIndex, pageSize]);

  // TanStack Table returns dynamic handlers, so this component is opted out of React Compiler memoization.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      rowSelection,
    },
    enableSorting,
    enableRowSelection,
    manualPagination: isManualPagination,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    onSortingChange: (updater) => {
      setSorting((current) => {
        const nextSorting =
          typeof updater === "function" ? updater(current) : updater;

        onSortingChange?.(nextSorting);
        return nextSorting;
      });
    },
    onPaginationChange: (updater) => {
      setPagination((current) => {
        const nextPagination =
          typeof updater === "function" ? updater(current) : updater;

        onPaginationChange?.(nextPagination);
        return nextPagination;
      });
    },
    onRowSelectionChange: setRowSelection,
  });

  const rows = table.getRowModel().rows;
  const visibleColumnCount = useMemo(
    () => columns.length + (enableRowSelection ? 1 : 0),
    [columns.length, enableRowSelection]
  );
  const selectedRowsCount = table.getSelectedRowModel().rows.length;
  const totalRowsLabel = totalRows ?? data.length;
  const firstRowNumber =
    totalRowsLabel === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const lastRowNumber = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    totalRowsLabel
  );
  const displayPageCount = Math.max(table.getPageCount(), 1);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-[#2c2c2c] text-left text-sm font-semibold uppercase tracking-wide text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {enableRowSelection && (
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      aria-label="Select all rows"
                      checked={table.getIsAllPageRowsSelected()}
                      onChange={table.getToggleAllPageRowsSelectedHandler()}
                      className="h-4 w-4 rounded border-gray-300 accent-[#2c2c2c]"
                    />
                  </th>
                )}
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDirection = header.column.getIsSorted();

                  return (
                    <th key={header.id} className="px-4 py-3">
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          disabled={!canSort}
                          onClick={header.column.getToggleSortingHandler()}
                          className="flex w-full items-center gap-2 text-left disabled:cursor-default"
                        >
                          <span>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                          {canSort && (
                            <span className="text-[10px] leading-none text-gray-300">
                              {sortDirection === "asc"
                                ? <IoMdArrowDropup size={20} color="white"/>
                                : sortDirection === "desc"
                                  ? <IoMdArrowDropdown size={20} color="white"/>
                                  : ""}
                            </span>
                          )}
                        </button>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white text-[#2c2c2c]">
            {loading ? (
              Array.from({ length: Math.min(pagination.pageSize, 5) }).map(
                (_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: visibleColumnCount }).map(
                      (_, columnIndex) => (
                        <td key={columnIndex} className="px-4 py-4">
                          <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                        </td>
                      )
                    )}
                  </tr>
                )
              )
            ) : rows.length > 0 ? (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="transition hover:bg-gray-50 data-[selected=true]:bg-gray-100"
                  data-selected={row.getIsSelected()}
                >
                  {enableRowSelection && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        aria-label="Select row"
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        onChange={row.getToggleSelectedHandler()}
                        className="h-4 w-4 rounded border-gray-300 accent-[#2c2c2c]"
                      />
                    </td>
                  )}
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={visibleColumnCount}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(enablePagination || enableRowSelection) && (
        <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-3 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {enablePagination ? (
              <span>
                Showing {firstRowNumber}-{lastRowNumber} of {totalRowsLabel}
              </span>
            ) : (
              <span>{totalRowsLabel} rows</span>
            )}
            {enableRowSelection && selectedRowsCount > 0 && (
              <span className="ml-3 font-medium text-[#2c2c2c]">
                {selectedRowsCount} selected
              </span>
            )}
          </div>

          {enablePagination && (
            <div className="flex items-center gap-2">
              <select
                value={pagination.pageSize}
                onChange={(event) => {
                  table.setPageSize(Number(event.target.value));
                }}
                className="rounded-md border border-gray-200 bg-white px-2 py-2 text-sm outline-none focus:border-[#2c2c2c]"
                aria-label="Rows per page"
              >
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size} / page
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="rounded-md border border-gray-200 px-3 py-2 font-medium text-[#2c2c2c] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-2 font-medium text-[#2c2c2c]">
                {pagination.pageIndex + 1} / {displayPageCount}
              </span>
              <button
                type="button"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="rounded-md border border-gray-200 px-3 py-2 font-medium text-[#2c2c2c] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
