export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.NEXT_PUBLIC_MOCKING === "true") {
    const { initMswInServer } = await import("@/1.app/msw/server");
    initMswInServer();
  }
}
