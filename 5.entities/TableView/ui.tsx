import {
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/6.shared/ui/shardcn/ui/table";
import { TableColumns, TableData } from "./model";
import { cn } from "@/6.shared/lib/tailwindMerge";

interface Props<T extends TableData> {
  columns: TableColumns<T>;
  datas: T;
}

function TableView<T extends TableData>({ columns, datas }: Props<T>) {
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
        <TableRow>
          {columns.map(({ accessKey, columnName }) => (
            <TableCell key={accessKey}>{datas[accessKey]}</TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}
