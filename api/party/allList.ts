export type Request = {
  query: {
    pageSize?: number;
    pageIndex?: number;
    sort?: "party-at" | "created-at" | "open-at" | "close-at";
    sortDirection?: "asc" | "desc";
    filter?: "available"[];
  };
};

export type Response = {
  pageSize: number;
  pageIndex: number;
  data: [
    {
      partyId: string;
      hostId: string;
      participantId: string;
      placeId: string;
      description: string;
      capacity: number;
      headcount: number;
      requestStatus: string;
      openAt: Date;
      closeAt: Date;
      partyAt: Date;
      createdAt: Date;
      updatedAt: Date;
    }
  ];
  isEnd: boolean;
};
