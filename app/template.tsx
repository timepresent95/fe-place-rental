import WaitMswSetupInBrowser from "@/1.app/msw/WaitMswSetupComponent";
import { PropsWithChildren } from "react";

export default function RootTemplate({ children }: PropsWithChildren) {
  return <WaitMswSetupInBrowser>{children}</WaitMswSetupInBrowser>;
}
