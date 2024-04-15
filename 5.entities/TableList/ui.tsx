import {
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/6.shared/ui/shardcn/ui/table";
import { TableColumns, TableData } from "./model";

interface Props<T extends TableData> {
  columns: TableColumns<T>;
  datas: T[];
  pageSize: number;
}

function TableList<T extends TableData>({
  columns,
  datas,
  pageSize,
}: Props<T>) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="h-10">
            {columns.map(({ accessKey, columnName }) => (
              <TableHead key={accessKey}>{columnName}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {datas.map((data, index) => (
            <TableRow key={index} className="h-10">
              {columns.map(({ accessKey }) => (
                <TableCell key={accessKey}>{data[accessKey]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ minHeight: `calc(2.5rem*${pageSize - datas.length})` }} />
    </>
  );
}

TableList.displayName = "TableList";

export default TableList;
