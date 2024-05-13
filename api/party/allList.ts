import { PartyInfo } from "./common";

export type SortableKey = "partyAt" | "createdAt" | "openAt" | "closeAt";
export type SortDirection = "asc" | "desc";
export type Filter = "available";

export type Request = {
  query: {
    pageSize?: number;
    pageIndex?: number;
    sort?: SortableKey;
    sortDirection?: SortDirection;
    filter?: Filter[];
  };
};

export type Response = {
  pageSize: number;
  pageIndex: number;
  data: PartyInfo[];
  total: number;
};
