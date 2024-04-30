"use client";

import { patchReservation } from "@/5.entities/Rental/api";
import { useTableWithDialog } from "@/5.entities/TableWithDialog/lib";
import { Button } from "@/6.shared/ui/shardcn/ui/button";

import { RentalManagementTableRow } from "../model";

function RentalDetailDialog() {
  const { data } = useTableWithDialog<RentalManagementTableRow>();
  return (
    <section className="pt-1">
      <h2 className="font-bold text-2xl text-center mb-6">예약 상세 페이지</h2>
      <div className="font-bold pl-2">
        {data.applicationState === "approved" && (
          <span className="text-emerald-700">승인된 예약</span>
        )}
        {data.applicationState === "rejected" && (
          <span className="text-rose-700">거절된 예약</span>
        )}
      </div>
      <div>
        <div className="flex border-slate justify-between border-b p-3">
          <p>
            <span className="font-semibold">예약 번호:</span>
            {data.id}
          </p>
          <p>
            <span className="font-semibold">예약일:</span> {data.rentalDate}
          </p>
        </div>
        <div className="border-b border-slate p-3">
          <h6 className="mb-2 font-semibold text-lg">신청자 정보</h6>
          <div className="space-y-1">
            <p>
              <span className="font-semibold">이름(단체명):</span>{" "}
              {data.hostName}
            </p>
            <p>
              <span className="font-semibold">이메일:</span> {data.contactEmail}
            </p>
            <p>
              <span className="font-semibold">전화:</span> {data.contactPhone}
            </p>
          </div>
        </div>
        <div className="border-b border-slate p-3">
          <h6 className="mb-2 font-semibold text-lg">대관 목적</h6>
          <p>{data.purpose}</p>
        </div>
        <div className="border-b border-slate p-3">
          <h6 className="mb-2 font-semibold text-lg">기타 정보</h6>
          <div className="mb-1">
            <span className="font-semibold">예상 참석 인원:</span>
            {data.expectedParticipants}
          </div>
          <div>
            <span className="font-semibold">공개 여부:</span>{" "}
            {data.isPublic ? "공개" : "비공개"}
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-12 p-3 mt-4">
        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            patchReservation(data.id, { applicationState: "rejected" })
              .then((res) => {
                //TODO: 승낙 후 toast
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
