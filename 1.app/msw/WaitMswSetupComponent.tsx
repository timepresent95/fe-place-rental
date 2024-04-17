"use client";

import { type PropsWithChildren, useEffect, useState } from "react";

const isMockingMode = process.env.NEXT_PUBLIC_MOCKING === "true";

export default function WaitMswSetupInBrowser({ children }: PropsWithChildren) {
  const [isDone, setIsDone] = useState(isMockingMode ? false : true);

  useEffect(() => {
    if (!isMockingMode || isDone) {
      return;
    }
    (async () => {
      if (typeof window !== "undefined") {
        const { initMswInWorker } = await import("./worker");
        initMswInWorker().then(() => {
          setIsDone(true);
        });
      } else {
        return setIsDone(true);
      }
    })();
  }, [isDone]);

  return isDone ? (
    children
  ) : (
    <p>MSW in Web Worker initialization is in progress</p>
  );
}
