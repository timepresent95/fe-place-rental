import { ComponentProps, use } from "react";

import clsx from "clsx";
import dayjs from "dayjs";
import { Clock, MapPinned, User } from "lucide-react";

import { getAllListParty } from "@/api";
import { PartyInfo } from "@/api/party/common";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { cn } from "@/util/tailwind";

interface Props extends ComponentProps<typeof Card> {
  partyPromise: ReturnType<typeof getAllListParty>;
}

function formatPartyCardData(info: PartyInfo) {
  const partyAt = dayjs(info.partyAt).format("YY.MM.DD");
  const hostName = info.host.lastName + " " + info.host.firstName;
  const placeAddress = info.place.address;
  const participantStatus = info.headcount + "/" + info.capacity;
  const requestState =
    info.requestState === "pending"
      ? "심사중"
      : info.requestState === "approved"
      ? "승인"
      : "거절";
  return {
    id: info.partyId,
    title: info.title,
    description: info.description,
    partyAt,
    hostName,
    placeAddress,
    participantStatus,
    requestState,
  };
}

function PartyCard({ className, partyPromise, ...props }: Props) {
  const result = use(partyPromise);
  if (result.status === "error") {
    throw new Error("데이터를 가져오는데 실패했습니다.");
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      {result.data.data.map(formatPartyCardData).map((v) => {
        return (
          <Card key={v.id} className={cn(className)} {...props}>
            <CardHeader className="pb-2 space-y-3">
              <CardTitle className="flex justify-between">
                <span>{v.title}</span>
                <span
                  className={clsx("w-16 text-right", {
                    "text-red-500": v.requestState === "거절",
                    "text-green-600": v.requestState === "승인",
                  })}>
                  {v.requestState}
                </span>
              </CardTitle>
              <div className="flex justify-between text-slate-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs">{v.partyAt}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span className="text-xs">{v.hostName}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm line-clamp-3">{v.description}</p>
              <div className="flex items-center space-x-3 rounded-md border py-2 px-4 mt-auto h-20">
                <MapPinned />
                <p className="text-xs">{v.placeAddress}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">참가 신청</Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

PartyCard.displayName = "PartyCard";
export default PartyCard;
