import { notFound } from "next/navigation";

import UnknownErrorPage from "./UnknownError";
import { NetworkError } from "@/6.shared/lib/api/Error/NetworkError";

interface Props {
  error: NetworkError & { digest?: string };
  reset: () => void;
}

function RootError({ error, reset }: Props) {
  const { statusCode } = error;

  switch (statusCode) {
    case 401:
      return notFound();
    default:
      return <UnknownErrorPage />;
  }
}

RootError.displayName = "RootError";

export default RootError;
