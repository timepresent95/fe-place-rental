"use client";

import { Suspense, use, useState, useTransition } from "react";

import { CellContext, ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import dayjs from "dayjs";

import { getAllListParty } from "@/api";
import { PartyInfo } from "@/api/party/common";
import { RequestState } from "@/mock/lib";

import Pagination from "../common/client/pagination";
import { DataTable } from "../common/dataTable";
import TableSkeleton from "../common/tableSkeleton";

const partyColumnDef: ColumnDef<PartyInfo>[] = [
  {
    accessorKey: "partyAt",
    accessorFn: (row) => dayjs(row.partyAt).format("YY.MM.DD"),
    header: "행사일",
    size: 80,
    meta: {
      headerClassName: "text-center",
      getCellProps: (context: CellContext<PartyInfo, unknown>) => {
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
    size: 120,
    meta: {
      headerClassName: "text-center",
      getCellProps: (context: CellContext<PartyInfo, unknown>) => {
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
    size: 300,
    meta: {
      headerClassName: "text-center",
    },
  },
  {
    id: "participantStatus",
    accessorFn: (row) => row.headcount + "/" + row.capacity,
    header: "참여 현황",
    size: 80,
    meta: {
      headerClassName: "text-right",
      getCellProps: (context: CellContext<PartyInfo, unknown>) => {
        return {
          className: clsx("text-right pr-5"),
        };
      },
    },
  },
  {
    accessorKey: "requestState",
    header: "승인 여부",
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

interface PartyTableProps {
  partyPromise: ReturnType<typeof getAllListParty>;
  onClickPagination: (index: number) => void;
}

function PartyTable({ partyPromise, onClickPagination }: PartyTableProps) {
  const result = use(partyPromise);
  const [isPending, startTransition] = useTransition();
  function changePageIndex(index: number) {
    startTransition(() => {
      onClickPagination(index);
    });
  }
  if (result.status === "error") {
    throw new Error("데이터를 가져오는데 실패했습니다.");
  }

  return (
    <div>
      <DataTable columns={partyColumnDef} data={result.data.data} />
      <Pagination
        className="mt-6"
        pageSize={result.data.pageSize}
        total={result.data.total}
        currentIndex={result.data.pageIndex}
        onClick={changePageIndex}
      />
    </div>
  );
}

//XXX: Cannot update a component while rendering a different component 에러 발생 원인 찾아내기
function PartyBoard() {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div>
      <Suspense fallback={<TableSkeleton />}>
        <PartyTable
          partyPromise={getAllListParty({
            query: { pageSize, pageIndex: currentIndex },
          })}
          onClickPagination={setCurrentIndex}
        />
      </Suspense>
    </div>
  );
}

PartyBoard.displayName = "PartyBoard";
export default PartyBoard;
