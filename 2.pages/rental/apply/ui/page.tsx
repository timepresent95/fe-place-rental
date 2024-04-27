"use server";

import { FACILITY_ID_QUERY_KEY } from "../lib";
import ReservationGuide from "./RentalGuide";
import RentalFormField from "./RentalFormField";
import { getMy } from "@/5.entities/authentication/api";
import CustomError from "@/6.shared/lib/CustomError";

interface Props {
  searchParams?: {
    [FACILITY_ID_QUERY_KEY]: string;
  };
}

async function RentaApplyPage({ searchParams }: Props) {
  const defaultValues = {
    applicantName: "",
    contactEmail: "",
    contactPhone: "",
    purpose: "",
    expectedParticipants: 3,
    useDate: undefined,
    isPublic: true,
  };

  const result = await getMy();
  //TODO: 로그인되지 않은 상태와 로그인 되었을때 생긴 에러 구분
  if (result.status === "success") {
    defaultValues.applicantName =
      result.data.familyName + result.data.firstName;
    defaultValues.contactEmail = result.data.email;
    defaultValues.contactPhone = result.data.phone;
  } else if (result.error.detailCode === 40002) {
    throw new CustomError(result.error);
  }

  return (
    <div className="grid grid-cols-2 gap-2 container">
      <ReservationGuide />
      <RentalFormField defaultValues={defaultValues} />
    </div>
  );
}

export default RentaApplyPage;
