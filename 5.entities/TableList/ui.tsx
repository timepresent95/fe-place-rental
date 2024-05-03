import {
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";

import { TableColumns, TableData } from "./model";

interface Props<T extends TableData> {
  columns: TableColumns<T>;
  datas: T[];
  pageSize: number;
  emptyMessage?: string;
  cellClassName: (data: T, accessKey: keyof T) => string;
}

function TableList<T extends TableData>({
  columns,
  datas,
  pageSize,
  emptyMessage = "테이블에 데이터가 존재하지 않습니다.",
  cellClassName = () => "",
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
                <TableCell
                  key={accessKey}
                  className={cellClassName(data, accessKey)}>
                  {data[accessKey]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div
        className="flex h-full items-center justify-center text-muted-foreground bg-slate-50"
        style={{ minHeight: `calc(2.5rem*${pageSize - datas.length})` }}>
        {datas.length === 0 ? <span>{emptyMessage}</span> : null}
      </div>
    </>
  );
}

TableList.displayName = "TableList";

export default TableList;
