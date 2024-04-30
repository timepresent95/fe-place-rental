"use client";

import { useTableWithDialog } from "@/5.entities/TableWithDialog/lib";
import { Button } from "@/6.shared/ui/shardcn/ui/button";

import { GatheringTableRow } from "../model";

function GatheringDetailDialog() {
  const { data } = useTableWithDialog<GatheringTableRow>();
  return (
    <section className="pt-1">
      <h2 className="font-bold text-2xl text-center mb-6">행사 상세 정보</h2>

      <div>
        <div className="flex border-slate justify-between border-b p-3">
          <p>
            <span className="font-semibold">예약 번호:</span>
            {data.id}
          </p>
          <p>
            <span className="font-semibold">행사 일:</span> {data.gatheringDate}
          </p>
        </div>
        <div className="border-b border-slate p-3">
          <h6 className="mb-2 font-semibold text-lg">행사 소개</h6>
          <p>{data.purpose}</p>
        </div>
        <div className="border-b border-slate p-3">
          <h6 className="mb-2 font-semibold text-lg">신청자 정보</h6>
          <div className="space-y-1">
            <p>
              <span className="font-semibold">이름(단체명):</span>{" "}
              {data.applicantName}
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
          <h6 className="mb-2 font-semibold text-lg">기타 정보</h6>
          <div className="mb-1">
            <span className="font-semibold">참여 현황</span>
            {data.participantState}
          </div>
          <div>
            <span className="font-semibold">공개 여부:</span>{" "}
            {data.isPublic ? "공개" : "비공개"}
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-12 p-3 mt-4">
        <Button size="lg" onClick={() => {}}>
          참여 신청
        </Button>
      </div>
    </section>
  );
}

GatheringDetailDialog.displayName = "GatheringDetailDialog";
export default GatheringDetailDialog;
