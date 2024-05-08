import "@tanstack/react-table"; //or vue, svelte, solid, qwik, etc.

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    headerClassName?: string;
    getCellProps?: (
      context: CellContext<TData, TValue>
    ) => TableCellProps | void;
  }
}
