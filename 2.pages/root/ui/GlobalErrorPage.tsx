import { customClientErrorCodes } from "@/6.shared/lib/api/customResponse";
import UnknownErrorPage from "./ErrorPage/UnknownError";
import WrongAuthenticatedErrorPage from "./ErrorPage/WrongAuthenticate";

function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (error.message === customClientErrorCodes[40002].message) {
    return <WrongAuthenticatedErrorPage />;
  }
  return <UnknownErrorPage />;
}

export default GlobalErrorPage;
