import { FACILITY_ID_QUERY_KEY } from "../lib";
import ReservationGuide from "./ReservationGuide";
import ReservationFormField from "./ReservationFormField";

interface Props {
  searchParams?: {
    [FACILITY_ID_QUERY_KEY]: string;
  };
}

function ReservationPostPage({ searchParams }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <ReservationGuide />
      <ReservationFormField />
    </div>
  );
}

export default ReservationPostPage;
