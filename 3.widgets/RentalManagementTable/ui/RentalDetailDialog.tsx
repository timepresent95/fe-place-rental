"use client";

import { patchReservation } from "@/5.entities/rental/api";
import { useTableWithDialog } from "@/5.entities/TableWithDialog/lib";
import { Button } from "@/6.shared/ui/shardcn/ui/button";

import { RentalManagementTableRow } from "../model";

function RentalDetailDialog() {
  const { data } = useTableWithDialog<RentalManagementTableRow>();
  return (
    <section className="pt-4">
      <div>
        {data.applicationState === "approved" && (
          <span className="text-emerald-700">승인된 예약</span>
        )}
        {data.applicationState === "rejected" && (
          <span className="text-rose-700">거절된 예약</span>
        )}
      </div>
      <div>
        <div className="flex border-slate justify-between border-b p-2">
          <p>예약 번호: {data.id}</p>
          <p>예약일: {data.rentalDate}</p>
        </div>
        <div className="border-b border-slate p-2">
          <h6 className="mb-2 font-semibold">신청자 정보</h6>
          <div>
            <p>이름(단체명): {data.applicantName}</p>
            <p>이메일: {data.contactEmail}</p>
            <p>전화: {data.contactPhone}</p>
          </div>
        </div>
        <div className="border-b border-slate p-2">
          <h6 className="mb-2 font-semibold">대관 목적</h6>
          <p>{data.purpose}</p>
        </div>
        <div className="border-b border-slate p-2">
          <h6 className="mb-2 font-semibold">기타 정보</h6>
          <div>예상 참석 인원: {data.expectedParticipants}</div>
          <div>공개 여부: {data.isPublic ? "공개" : "비공개"}</div>
        </div>
      </div>
      <div className="flex justify-center space-x-12 p-2 mt-4">
        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            patchReservation(data.id, { applicationState: "rejected" })
              .then((res) => {
                console.log(res);
              })
              .catch((error: unknown) => {
                console.log(error);
              });
          }}>
          거절
        </Button>
        <Button
          size="lg"
          onClick={() => {
            patchReservation(data.id, { applicationState: "approved" })
              .then((res) => {
                console.log(res);
              })
              .catch((error: unknown) => {
                console.log(error);
              });
          }}>
          승인
        </Button>
      </div>
    </section>
  );
}

RentalDetailDialog.displayName = "RentalDetailDialog";
export default RentalDetailDialog;
