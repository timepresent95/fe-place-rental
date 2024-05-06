import { PartyInfo } from "./common";

export type SortableKey = "party-at" | "created-at" | "open-at" | "close-at";
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
  isEnd: boolean;
};
