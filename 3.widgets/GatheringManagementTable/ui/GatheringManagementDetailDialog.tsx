"use client";

import clsx from "clsx";
import { toast } from "sonner";

import { invitationGathering } from "@/4.features/Gathering/api";
import { APPLICATION_STATE_PRESENT } from "@/4.features/Gathering/model";
import { useTableWithDialog } from "@/5.entities/TableWithDialog/lib";
import { Button } from "@/6.shared/ui/shardcn/ui/button";

import { GatheringManagementTableRow } from "../model";

function GatheringManagementDetailDialog() {
  const { data } = useTableWithDialog<GatheringManagementTableRow>();
  return (
    <section className="pt-1">
      <h2 className="font-bold text-2xl text-center mb-6">
        모임 참여 신청자 관리
      </h2>
      <div className="font-bold pl-2"></div>
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col">상태</th>
            <th scope="col">신청자 이름</th>
            <th scope="col">이메일</th>
            <th scope="col">전화번호</th>
            <th scope="col">신청 수락/거절</th>
          </tr>
        </thead>
        <tbody>
          {data.applicants.map((v, i) => (
            <tr key={i}>
              <td
                className={clsx(
                  "text-center font-semibold",
                  { "text-rose-700": v.applicationState === "rejected" },
                  { "text-emerald-700": v.applicationState === "approved" }
                )}>
                {APPLICATION_STATE_PRESENT[v.applicationState]}
              </td>
              <td className="text-center">
                {v.familyName + " " + v.firstName}
              </td>
              <td className="text-center">{v.email}</td>
              <td className="text-center">{v.phone}</td>
              <td className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => {
                    invitationGathering(data.id, {
                      applicationState: "rejected",
                    }).then((res) => {
                      if (res.status === "success") {
                        toast(
                          v.familyName +
                            " " +
                            v.firstName +
                            "님의 참가를 거절하였습니다."
                        );
                      } else {
                        console.error(res.error);
                        toast("서버 에러", {
                          description:
                            "참여 신청이 실패했습니다. 잠시후 다시 시도해주세요",
                        });
                      }
                    });
                  }}>
                  거절
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    invitationGathering(data.id, {
                      applicationState: "approved",
                    }).then((res) => {
                      if (res.status === "success") {
                        toast(
                          v.familyName +
                            " " +
                            v.firstName +
                            "님의 참가를 수락하였습니다."
                        );
                      } else {
                        console.error(res.error);
                        toast("서버 에러", {
                          description:
                            "참여 신청이 실패했습니다. 잠시후 다시 시도해주세요",
                        });
                      }
                    });
                  }}>
                  수락
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center space-x-12 p-3 mt-4"></div>
    </section>
  );
}

GatheringManagementDetailDialog.displayName = "GatheringManagementDetailDialog";
export default GatheringManagementDetailDialog;
