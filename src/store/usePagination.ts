import { create } from "zustand";

export interface IPaginationStore {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  setPageNumber: (value: number) => void;
  setPageSize: (value: number) => void;
  setTotalPages: (value: number) => void;
  setTotalRecords: (value: number) => void;
}

export const usePaginationStore = create<IPaginationStore>((set) => {
  return {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    setPageNumber: (value) => set({ pageNumber: value }),
    setPageSize: (value) => set({ pageSize: value }),
    setTotalPages: (value) => set({ totalPages: value }),
    setTotalRecords: (value) => set({ totalRecords: value }),
  };
});
