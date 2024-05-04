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

export type Row = {
  partyId: string;
  hostId: string;
  placeId: string;
  description: string;
  capacity: number;
  requestStatus: string;
  openAt: Date;
  closeAt: Date;
  partyAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type Response = {
  pageSize: number;
  pageIndex: number;
  data: Row[];
  isEnd: boolean;
};
