"use client";

import { TableColumns, TableData } from "@/5.entities/TableList/model";
import Pagination from "@/6.shared/ui/Pagination/ui";
import { PropsWithChildren } from "react";
import TableWithDialog from "@/5.entities/TableWithDialog/ui";

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