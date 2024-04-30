export const DEFAULT_PAGE_SIZE = 10;

export const PAGINATION_QUERY_KEY = "page-index";
const PAGE_SIZE_QUERY_KEY = "page-size";
export const AVAILABLE_FILTER_QUERY_KEY = "available";

export interface Props {
  searchParams?: {
    [PAGINATION_QUERY_KEY]: string;
    [PAGE_SIZE_QUERY_KEY]: string;
    [AVAILABLE_FILTER_QUERY_KEY]: string;
  };
}

export function extractQuery(searchParams: Props["searchParams"]) {
  const paginationQuery = searchParams?.[PAGINATION_QUERY_KEY];
  const pageSizeQuery = searchParams?.[PAGE_SIZE_QUERY_KEY];
  const availableFilter = searchParams?.[AVAILABLE_FILTER_QUERY_KEY];

  if (paginationQuery === undefined || pageSizeQuery === undefined) {
    return {
      availableFilter:
        availableFilter === undefined ? undefined : availableFilter === "true",
    };
  }

  const pagination = Number(paginationQuery);
  const pageSize = Number(pageSizeQuery);

  return {
    availableFilter:
      availableFilter === undefined ? undefined : availableFilter === "true",
    pagination,
    pageSize,
    offset: (pagination - 1) * pageSize,
  };
}

export function createRedirectUrl(
  pagination: number,
  pageSize: number,
  availableFilter?: boolean
): string {
  const availableFilterQuery =
    availableFilter === undefined
      ? ""
      : `&${AVAILABLE_FILTER_QUERY_KEY}=${availableFilter}`;
  return `/gathering/list?${PAGINATION_QUERY_KEY}=${pagination}&${PAGE_SIZE_QUERY_KEY}=${pageSize}${availableFilterQuery}`;
}
