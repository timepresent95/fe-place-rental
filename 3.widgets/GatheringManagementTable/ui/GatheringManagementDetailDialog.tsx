"use client";

import { useTableWithDialog } from "@/5.entities/TableWithDialog/lib";

import { GatheringManagementTableRow } from "../model";

function GatheringManagementDetailDialog() {
  const { data } = useTableWithDialog<GatheringManagementTableRow>();
  return (
    <section className="pt-1">
      <h2 className="font-bold text-2xl text-center mb-6">모임 참여자 관리</h2>
      <div className="font-bold pl-2"></div>
      <div>
        {data.applicants.map((v, i) => (
          <div key={i}>{JSON.stringify(v)}</div>
        ))}
      </div>
      <div>
        {data.attendees.map((v, i) => (
          <div key={i}>{JSON.stringify(v)}</div>
        ))}
      </div>
      <div className="flex justify-center space-x-12 p-3 mt-4"></div>
    </section>
  );
}

GatheringManagementDetailDialog.displayName = "GatheringManagementDetailDialog";
export default GatheringManagementDetailDialog;
