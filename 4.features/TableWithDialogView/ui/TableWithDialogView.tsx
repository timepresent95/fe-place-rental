"use client";

import { PropsWithChildren } from "react";

import { TableColumns, TableData } from "@/5.entities/TableWithDialog/model";
import TableWithDialog from "@/5.entities/TableWithDialog/ui";
import Pagination from "@/ui/pagination";

interface Props<T extends TableData> extends PropsWithChildren {
  columns: TableColumns<T>;
  datas: T[];
  pageSize: number;
  total: number;
  paginationQueryKey: string;
  emptyMessage?: string;
}

function TableWithDialogView<T extends TableData>({
  columns,
  datas,
  pageSize,
  total,
  paginationQueryKey,
  emptyMessage = "테이블에 데이터가 존재하지 않습니다.",
  children,
}: Props<T>) {
  return (
    <div>
      <TableWithDialog
        columns={columns}
        datas={datas}
        pageSize={pageSize}
        emptyMessage={emptyMessage}>
        {children}
      </TableWithDialog>
      {total === 0 ? null : (
        <Pagination
          total={total}
          pageSize={pageSize}
          paginationQueryKey={paginationQueryKey}
          className="mt-4"
        />
      )}
    </div>
  );
}

TableWithDialogView.display = "TableWithDialogView";

export default TableWithDialogView;
