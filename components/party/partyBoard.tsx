"use client";

import { Suspense, useDeferredValue, useMemo, useState } from "react";

import { CellContext, ColumnDef, SortingState } from "@tanstack/react-table";
import clsx from "clsx";
import dayjs from "dayjs";
import { Grid2X2, List } from "lucide-react";

import { getAllListParty } from "@/api";
import { Filter, SortableKey } from "@/api/party/allList";
import { PartyInfo } from "@/api/party/common";
import { RequestState } from "@/mock/lib";
import { Checkbox } from "@/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";

import PartyCard from "./partyCard";
import PartyTable from "./partyTable";
import TableSkeleton from "../common/tableSkeleton";

const partyColumnDef: ColumnDef<PartyInfo>[] = [
  {
    accessorKey: "partyAt",
    accessorFn: (row) => dayjs(row.partyAt).format("YY.MM.DD"),
    header: "행사일",
    sortDescFirst: true,
    size: 80,
    meta: {
      headerClassName: "text-center",
      getCellProps: () => {
        return {
          className: clsx("text-center"),
        };
      },
    },
  },
  {
    id: "hostName",
    accessorFn: (row) => row.host.lastName + " " + row.host.firstName,
    header: "주최자",
    enableSorting: false,
    size: 120,
    meta: {
      headerClassName: "text-center",
      getCellProps: () => {
        return {
          className: clsx("text-center"),
        };
      },
    },
  },
  {
    id: "placeAddress",
    accessorFn: (row) => row.place.address,
    header: "행사장 주소",
    enableSorting: false,
    size: 300,
    meta: {
      headerClassName: "text-center",
    },
  },
  {
    id: "participantStatus",
    accessorFn: (row) => row.headcount + "/" + row.capacity,
    header: "참여 현황",
    enableSorting: false,
    size: 80,
    meta: {
      headerClassName: "text-right",
      getCellProps: () => {
        return {
          className: clsx("text-right pr-5"),
        };
      },
    },
  },
  {
    accessorKey: "requestState",
    header: "승인 여부",
    enableSorting: false,
    size: 80,
    accessorFn: (row) => {
      switch (row.requestState as RequestState) {
        case "approved":
          return "승인";
        case "rejected":
          return "거절";
        case "pending":
          return "심사중";
      }
    },
    meta: {
      headerClassName: "text-center",
      getCellProps: (context: CellContext<PartyInfo, unknown>) => {
        return {
          className: clsx("font-medium text-center", {
            "text-red-500": context.getValue() === "거절",
            "text-green-600": context.getValue() === "승인",
          }),
        };
      },
    },
  },
];

//XXX: Cannot update a component while rendering a different component 에러 발생 원인 찾아내기
type ViewType = "list" | "card";
function PartyBoard() {
  const [viewType, setViewType] = useState<ViewType>("list");
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageSizeList, setPageSizeList] = useState<number[]>([10, 20, 30]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [availableFilter, setAvaliableFilter] = useState<boolean>(false);
  function changeViewType(type: ViewType) {
    setViewType(type);
    setPageSizeList(type === "list" ? [10, 20, 30] : [12, 24, 36]);
    setPageSize(type === "list" ? 10 : 12);
  }

  const partyPromise = useMemo(() => {
    const sort = sorting.length ? (sorting[0].id as SortableKey) : undefined;
    const sortDirection = sorting.length
      ? sorting[0].desc
        ? "desc"
        : "asc"
      : undefined;
    const filter: Filter[] = availableFilter ? ["available"] : [];
    window.scrollTo({ top: 0 });
    return getAllListParty({
      query: { pageSize, pageIndex: currentIndex, sort, sortDirection, filter },
    });
  }, [pageSize, currentIndex, sorting, availableFilter]);
  const deferredPartyPromise = useDeferredValue(partyPromise);

  return (
    <div>
      <div className="flex items-center px-4 mb-3">
        <Select
          value={pageSize.toString()}
          onValueChange={(v) => {
            setCurrentIndex(0);
            setPageSize(parseInt(v));
          }}>
          <SelectTrigger className="w-[80px] mr-4">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeList.map((v) => (
              <SelectItem value={v.toString()} key={v}>
                {v} 개
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={availableFilter}
            onClick={() => setAvaliableFilter((old) => !old)}
          />
          <label htmlFor="terms" className="font-medium leading-none">
            참여 가능한 행사만 보기
          </label>
        </div>
        <ToggleGroup
          type="single"
          className="ml-auto"
          value={viewType}
          onValueChange={(v: ViewType) => {
            if (v) {
              changeViewType(v);
            }
          }}>
          <ToggleGroupItem value="list">
            <List className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="card">
            <Grid2X2 className="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        {viewType === "list" ? (
          <PartyTable
            columns={partyColumnDef}
            partyPromise={deferredPartyPromise}
            onClickPagination={setCurrentIndex}
            sorting={sorting}
            onSortingChange={setSorting}
          />
        ) : (
          <PartyCard
            partyPromise={partyPromise}
            onClickPagination={setCurrentIndex}
          />
        )}
      </Suspense>
    </div>
  );
}

PartyBoard.displayName = "PartyBoard";
export default PartyBoard;
