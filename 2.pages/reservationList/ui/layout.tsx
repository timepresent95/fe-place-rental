import { PropsWithChildren } from "react";

export default async function ReservationListLayout({
  children,
}: PropsWithChildren) {
  return (
    <main className="px-4 container">
      <h1 className="text-3xl font-semibold text-center mb-8">예약 현황</h1>
      {children}
    </main>
  );
}
