import { ApplicationState } from "@/5.entities/Rental/model";

export const DEFAULT_PAGE_SIZE = 10;

export const PAGINATION_QUERY_KEY = "page-index";
const PAGE_SIZE_QUERY_KEY = "page-size";
export const APPLICATION_STATE_FILTER_QUERY_KEY = "application-state";

export interface Props {
  searchParams?: {
    [PAGINATION_QUERY_KEY]: string;
    [PAGE_SIZE_QUERY_KEY]: string;
    [APPLICATION_STATE_FILTER_QUERY_KEY]: ApplicationState | ApplicationState[];
  };
}

export function extractQuery(searchParams: Props["searchParams"]) {
  const paginationQuery = searchParams?.[PAGINATION_QUERY_KEY];
  const pageSizeQuery = searchParams?.[PAGE_SIZE_QUERY_KEY];
  const applicationState = [
    searchParams?.[APPLICATION_STATE_FILTER_QUERY_KEY] ?? [],
  ].flat();

  if (paginationQuery === undefined || pageSizeQuery === undefined) {
    return {
      applicationState,
    };
  }

  const pagination = Number(paginationQuery);
  const pageSize = Number(pageSizeQuery);

  return {
    applicationState,
    pagination,
    pageSize,
    offset: (pagination - 1) * pageSize,
  };
}

export function createRedirectUrl(
  applicationState: ApplicationState[],
  pagination: number,
  pageSize: number
): string {
  const applicaitonStateFilterQuery = applicationState
    .map((v) => `${APPLICATION_STATE_FILTER_QUERY_KEY}=${v}`)
    .join("&");
  return `/rental/list?${PAGINATION_QUERY_KEY}=${pagination}&${PAGE_SIZE_QUERY_KEY}=${pageSize}&${applicaitonStateFilterQuery}`;
}
