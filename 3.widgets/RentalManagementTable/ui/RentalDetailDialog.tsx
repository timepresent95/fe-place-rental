"use client";

import { useTableWithDialog } from "@/5.entities/TableWithDialog/lib";

function RentalDetailDialog() {
  const { data: datas } = useTableWithDialog();
  return <div>{JSON.stringify(datas)}</div>;
}

RentalDetailDialog.displayName = "RentalDetailDialog";
export default RentalDetailDialog;
