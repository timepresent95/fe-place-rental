import TableListUI from "@/5.entities/TableList/ui";
import { TableColumns, TableData } from "@/5.entities/TableList/model";
import Pagination from "@/6.shared/ui/Pagination/ui";

interface Props<T extends TableData> {
  columns: TableColumns<T>;
  datas: T[];
  pageSize: number;
  total: number;
  pagenationQuery: string;
}

function TableView<T extends TableData>({
  columns,
  datas,
  pageSize,
  total,
  pagenationQuery,
}: Props<T>) {
  return (
    <div>
      <TableListUI columns={columns} datas={datas} pageSize={pageSize} />
      <Pagination
        total={total}
        pageSize={pageSize}
        pagenationQuery={pagenationQuery}
        className="mt-4"
      />
    </div>
  );
}

TableView.display = "TableView";

export default TableView;
