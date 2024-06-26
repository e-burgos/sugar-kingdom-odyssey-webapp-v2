import React from "react";
import { Table } from "@tanstack/react-table";
import styles from "./pagination.module.css";
import { TData } from "@/pages/leaderboard/Datatable/TournamentColumns";
import ButtonLeft from "@/components/buttons/button-left";
import ButtonRight from "@/components/buttons/button-right";
import ButtonText from "@/components/buttons/button-text";
import Paragraph from "@/components/typography/paragraph";

interface PaginationProps {
  table: Table<TData>;
}

const Pagination: React.FC<PaginationProps> = ({ table }) => {
  return (
    <div className={styles.footer}>
      <div className={styles.buttons}>
        <ButtonLeft
          size="40px"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        />
        <ButtonLeft
          size="30px"
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        />
        <div className={styles.pageLabel}>
          <Paragraph fontFamily="Gotham-Medium" color="white">
            {`Page ${table.getState().pagination.pageIndex + 1} of
            ${table.getPageCount().toLocaleString()}`}
          </Paragraph>
        </div>
        <ButtonRight
          size="30px"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        />
        <ButtonRight
          size="40px"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        />
      </div>
      <div className={styles.selectContainer}>
        <ButtonText
          style={{
            height: "55px",
          }}
          children={
            <select
              className={styles.select}
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {`${pageSize} records`}
                </option>
              ))}
            </select>
          }
        />
        {/* <span className="flex items-center gap-1" style={{ color: "white" }}>
        | Go to page:
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="border p-1 rounded w-16"
        />
      </span> */}
      </div>
    </div>
  );
};

export default Pagination;
