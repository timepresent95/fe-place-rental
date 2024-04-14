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
}

function TableList<T extends TableData>({ columns, datas }: Props<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map(({ accessKey, columnName }) => (
            <TableHead key={accessKey}>{columnName}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {datas.map((data, index) => (
          <TableRow key={index}>
            {columns.map(({ accessKey }) => (
              <TableCell key={accessKey}>{data[accessKey]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

TableList.displayName = "TableList";

export default TableList;
