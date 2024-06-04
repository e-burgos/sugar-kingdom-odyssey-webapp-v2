/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  ColumnDef,
} from "@tanstack/react-table";
import styles from "./styles/datatable.module.css";
import { usePaginationStore } from "@/store/usePagination";
import Pagination from "./components/Pagination";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  showPagination?: boolean;
}
// @ts-ignore
const DataTable: React.FC<DataTableProps<TData>> = ({
  data: defaultData,
  columns,
  showPagination,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, _setData] = React.useState(() => [...defaultData]);
  const { pageNumber, pageSize } = usePaginationStore();

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageSize: pageSize,
    pageIndex: pageNumber - 1,
  });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className={styles.tbody}>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot className={styles.tfoot}>
            {table.getFooterGroups().map((footerGroup) => (
              <tr className={styles.tr} key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th className={styles.th} key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
      {showPagination && <Pagination table={table} />}
    </>
  );
};

export default DataTable;
