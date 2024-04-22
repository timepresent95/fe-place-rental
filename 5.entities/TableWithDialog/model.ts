export type TableData = Record<string, any>;

export type TableColumn<T extends TableData> = {
  accessKey: Extract<keyof T, string>;
  columnName: string;
};

export type TableColumns<T extends TableData> = TableColumn<T>[];
