import { HTMLAttributes } from "react";

import {
  ColumnDef,
  ColumnSort,
  OnChangeFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";

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
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
}

function DataTable<TData extends TableData>({
  columns,
  data,
  sorting,
  onSortingChange,
  ...props
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    enableMultiSort: false,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    state: {
      sorting,
    },
    onSortingChange,
  });

  return (
    <Table {...props}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const meta = header.column.columnDef.meta;
              const headerClassName = meta?.headerClassName;
              const isSortable = header.column.getCanSort();

              return (
                <TableHead
                  key={header.id}
                  className={clsx(headerClassName, {
                    "cursor-pointer": isSortable,
                  })}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ width: `${header.getSize()}px` }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? null}
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
          <TableRow className="h-40">
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
