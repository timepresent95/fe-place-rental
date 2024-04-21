import { FACILITY_ID_QUERY_KEY } from "../lib";
import ReservationGuide from "./ReservationGuide";
import ReservationFormField from "./ReservationFormField";
import { getMy } from "@/5.entities/authentication/api";

interface Props {
  searchParams?: {
    [FACILITY_ID_QUERY_KEY]: string;
  };
}

async function ReservationPostPage({ searchParams }: Props) {
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
  if (result.status === "success") {
    defaultValues.applicantName =
      result.data.familyName + result.data.firstName;
    defaultValues.contactEmail = result.data.email;
    defaultValues.contactPhone = result.data.phone;
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <ReservationGuide />
      <ReservationFormField defaultValues={defaultValues} />
    </div>
  );
}

export default ReservationPostPage;
