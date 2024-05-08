import { HTMLAttributes } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";

type TableData = Record<string, any>;

interface DataTableProps<TData extends TableData>
  extends HTMLAttributes<HTMLTableElement> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

function DataTable<TData extends TableData>({
  columns,
  data,
  ...props
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table {...props}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const meta = header.column.columnDef.meta;
              const headerClassName = meta?.headerClassName;

              return (
                <TableHead
                  key={header.id}
                  className={headerClassName}
                  style={{ width: `${header.getSize()}px` }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}>
              {row.getVisibleCells().map((cell) => {
                const cellContext = cell.getContext();
                const meta = cellContext.cell.column.columnDef.meta;
                const cellProps = meta?.getCellProps
                  ? meta.getCellProps(cellContext)
                  : {};

                return (
                  <TableCell key={cell.id} {...cellProps}>
                    {flexRender(cell.column.columnDef.cell, cellContext)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={table.getAllColumns().length}
              className="text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export { DataTable };
