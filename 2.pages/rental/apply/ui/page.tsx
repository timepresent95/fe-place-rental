"use server";

import { FACILITY_ID_QUERY_KEY } from "../lib";
import ReservationGuide from "./RentalGuide";
import RentalFormField from "./RentalFormField";

interface Props {
  searchParams?: {
    [FACILITY_ID_QUERY_KEY]: string;
  };
}

async function RentaApplyPage({ searchParams }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 container">
      <ReservationGuide />
      <RentalFormField />
    </div>
  );
}

export default RentaApplyPage;
