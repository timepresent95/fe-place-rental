import UnknownErrorPage from "./ErrorPage/UnknownError";
import WrongAuthenticatedErrorPage from "./ErrorPage/WrongAuthenticate";

function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (error.message === "wrong token") {
    return <WrongAuthenticatedErrorPage />;
  }
  return <UnknownErrorPage />;
}

export default GlobalErrorPage;
