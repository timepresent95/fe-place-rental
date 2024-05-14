import { use } from "react";

import { ColumnDef, OnChangeFn, SortingState } from "@tanstack/react-table";

import { getAllListParty } from "@/api";
import { PartyInfo } from "@/api/party/common";

import Pagination from "../common/client/pagination";
import { DataTable } from "../common/dataTable";

interface PartyTableProps {
  columns: ColumnDef<PartyInfo>[];
  partyPromise: ReturnType<typeof getAllListParty>;
  onClickPagination: (index: number) => void;
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
}

function PartyTable({
  columns,
  partyPromise,
  onClickPagination,
  sorting,
  onSortingChange,
}: PartyTableProps) {
  const result = use(partyPromise);

  if (result.status === "error") {
    throw new Error("데이터를 가져오는데 실패했습니다.");
  }
  return (
    <div>
      <DataTable
        sorting={sorting}
        onSortingChange={onSortingChange}
        columns={columns}
        data={result.data.data}
      />
      <Pagination
        className="mt-6"
        pageSize={result.data.pageSize}
        total={result.data.total}
        currentIndex={result.data.pageIndex}
        onClick={onClickPagination}
      />
    </div>
  );
}

PartyTable.displayName = "PartyTable";
export default PartyTable;
