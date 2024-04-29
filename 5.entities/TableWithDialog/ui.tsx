"use client";

import { PropsWithChildren } from "react";

import clsx from "clsx";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/6.shared/ui/shardcn/ui/dialog";
import {
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/6.shared/ui/shardcn/ui/table";

import { TableWithDialogContext } from "./lib";
import { TableColumns, TableData } from "./model";

interface Props<T extends TableData> extends PropsWithChildren {
  columns: TableColumns<T>;
  datas: T[];
  pageSize: number;
  emptyMessage?: string;
}

function TableWithDialog<T extends TableData>({
  columns,
  datas,
  pageSize,
  emptyMessage = "테이블에 데이터가 존재하지 않습니다.",
  children,
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
            <Dialog key={index}>
              <DialogTrigger asChild>
                <TableRow className="h-10 cursor-pointer">
                  {columns.map(({ accessKey, className }) => (
                    <TableCell key={accessKey} className={clsx(className)}>
                      {data[accessKey]}
                    </TableCell>
                  ))}
                </TableRow>
              </DialogTrigger>
              <DialogContent>
                <TableWithDialogContext.Provider value={{ data }}>
                  {children}
                </TableWithDialogContext.Provider>
              </DialogContent>
            </Dialog>
          ))}
        </TableBody>
      </Table>
      <div
        className="flex h-full items-center justify-center text-muted-foreground"
        style={{ minHeight: `calc(2.5rem*${pageSize - datas.length})` }}>
        {datas.length === 0 ? <span>{emptyMessage}</span> : null}
      </div>
    </>
  );
}

TableWithDialog.displayName = "TableWithDialog";

export default TableWithDialog;
