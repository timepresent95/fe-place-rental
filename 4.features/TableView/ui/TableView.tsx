import TableListUI from "@/5.entities/TableList/ui";
import { TableColumns, TableData } from "@/5.entities/TableList/model";
import Pagination from "@/6.shared/ui/Pagination/ui";

interface Props<T extends TableData> {
  columns: TableColumns<T>;
  datas: T[];
  pageSize: number;
  total: number;
  paginationQueryKey: string;
  emptyMessage?: string;
}

function TableView<T extends TableData>({
  columns,
  datas,
  pageSize,
  total,
  paginationQueryKey,
  emptyMessage = "테이블에 데이터가 존재하지 않습니다.",
}: Props<T>) {
  return (
    <div>
      <TableListUI
        columns={columns}
        datas={datas}
        pageSize={pageSize}
        emptyMessage={emptyMessage}
      />
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

TableView.display = "TableView";

export default TableView;
