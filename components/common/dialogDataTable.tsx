import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type Table as TableType,
} from "@tanstack/react-table";

import { Dialog, DialogContent, DialogTrigger } from "@/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";

type TableData = Record<string, any>;

const DialogActionContext = createContext<((v: any) => void) | null>(null);
const DialogValueContext = createContext<TableData | null>(null);

function DialogProvider<T extends TableData>({ children }: PropsWithChildren) {
  const [data, setData] = useState<T | null>(null);
  const changeData = (v: T) => {
    if (data === null) {
      return setData({ ...v });
    }
    setData({ ...data, ...v });
  };
  return (
    <DialogActionContext.Provider value={changeData}>
      <DialogValueContext.Provider value={data}>
        {children}
      </DialogValueContext.Provider>
    </DialogActionContext.Provider>
  );
}

function useDialogAction<T extends TableData>(): (v: T) => void {
  const action = useContext(DialogActionContext);
  if (action === null) {
    throw new Error("useCounterValue should be used within CounterProvider");
  }
  return action;
}

function useDialogValue(): TableData {
  const value = useContext(DialogValueContext);
  if (value === null) {
    throw new Error("useCounterValue should be used within CounterProvider");
  }
  return value;
}

function DialogDataTableBody<TData extends TableData>({
  table,
}: {
  table: TableType<TData>;
}) {
  const action = useDialogAction();
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <DialogTrigger
            key={row.id}
            asChild
            onClick={() => action(row.original)}>
            <TableRow data-state={row.getIsSelected() && "selected"}>
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
          </DialogTrigger>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={table.getAllColumns().length}
            className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

interface DialogDataTableProps<TData extends TableData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

function DialogDataTable<TData extends TableData>({
  columns,
  data,
}: DialogDataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
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
      <Dialog>
        <DialogProvider>
          <DialogDataTableBody table={table} />
          <DialogContent className="break-all">
            <p>1</p>
          </DialogContent>
        </DialogProvider>
      </Dialog>
    </Table>
  );
}
DialogDataTable.displayName = "DialogDataTable";

export { DialogDataTable };
