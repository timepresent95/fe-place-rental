"use client";

import { useEffect, useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { getAllListParty } from "@/api";
import { PartyInfo } from "@/api/party/common";
import { DataTable } from "@/components/client/dataTable";

const partyColumnDef: ColumnDef<PartyInfo>[] = [
  {
    accessorKey: "partyAt",
    accessorFn: (row) => dayjs(row.partyAt).format("YY.MM.DD"),
    header: "행사일",
  },
  {
    id: "hostName",
    accessorFn: (row) => row.host.lastName + " " + row.host.firstName,
    header: "주최자",
  },
  {
    id: "placeAddress",
    accessorFn: (row) => row.place.address,
    header: "행사장 주소",
  },
  {
    id: "participantStatus",
    accessorFn: (row) => row.headcount + "/" + row.capacity,
    header: "참여 현황",
  },
  {
    accessorKey: "requestState",
    header: "승인 여부",
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
