"use client";

import { useEffect, useState } from "react";

import { CellContext, ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import dayjs from "dayjs";

import { getAllListParty } from "@/api";
import { PartyInfo } from "@/api/party/common";
import { DataTable } from "@/components/client/dataTable";
import { RequestState } from "@/mock/lib";

const partyColumnDef: ColumnDef<PartyInfo>[] = [
  {
    accessorKey: "partyAt",
    accessorFn: (row) => dayjs(row.partyAt).format("YY.MM.DD"),
    header: "행사일",
    size: 100,
    meta: {
      getCellContext: (context: CellContext<PartyInfo, unknown>) => {
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
    size: 100,
    meta: {
      getCellContext: (context: CellContext<PartyInfo, unknown>) => {
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
    enableResizing: false,
    size: 240,
  },
  {
    id: "participantStatus",
    accessorFn: (row) => row.headcount + "/" + row.capacity,
    header: "참여 현황",
    enableResizing: false,
    size: 50,
    meta: {
      getCellContext: (context: CellContext<PartyInfo, unknown>) => {
        return {
          className: clsx("text-right pr-6"),
        };
      },
    },
  },
  {
    accessorKey: "requestState",
    header: "승인 여부",
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
    enableResizing: false,
    size: 70,
    meta: {
      getCellContext: (context: CellContext<PartyInfo, unknown>) => {
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
  const [tableData, setTableData] = useState<PartyInfo[]>([]);
  useEffect(() => {
    getAllListParty({ query: {} }).then((res) => {
      if (res.status === "success") {
        console.log(res.data);
        setTableData(res.data.data);
      }
    });
  }, []);
  return <DataTable columns={partyColumnDef} data={tableData} />;
}

PartyTable.displayName = "PartyTable";

export default PartyTable;
