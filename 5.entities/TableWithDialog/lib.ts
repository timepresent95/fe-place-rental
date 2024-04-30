import { createContext, useContext } from "react";

import { TableData } from "./model";

interface TableWithDialogContext<T extends TableData> {
  data: T;
}

export const TableWithDialogContext = createContext<
  Partial<TableWithDialogContext<TableData>>
>({
  data: undefined,
});

export function useTableWithDialog<
  T extends TableData
>(): TableWithDialogContext<T> {
  const value = useContext(TableWithDialogContext);
  if (value.data === undefined) {
    throw new Error(
      "useTableWithDialog는 TableWithDialogContext Provider 안에서만 사용 가능합니다."
    );
  }
  return { data: value.data as T };
}
