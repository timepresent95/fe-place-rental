"use client";

import { useEffect, useState } from "react";

import { CellContext, ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import dayjs from "dayjs";

import { getAllListParty } from "@/api";
import { PartyInfo } from "@/api/party/common";
import { RequestState } from "@/mock/lib";

import Pagination from "../common/client/pagination";
import { DataTable } from "../common/dataTable";

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

function PartyTable() {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [tableData, setTableData] = useState<PartyInfo[]>([]);
  useEffect(() => {
    getAllListParty({ query: {} }).then((res) => {
      if (res.status === "success") {
        setCurrentIndex(res.data.pageIndex);
        setTotal(res.data.total);
        setTableData(res.data.data);
      }
    });
  }, []);
  return (
    <div>
      <DataTable columns={partyColumnDef} data={tableData} />
      <Pagination
        className="mt-6"
        pageSize={pageSize}
        total={total}
        currentIndex={currentIndex}
        onClick={(index) => setCurrentIndex(index)}
      />
    </div>
  );
}

export default PartyTable;
