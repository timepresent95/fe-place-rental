export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.MOCKING === "true") {
    const { initMsw } = await import("@/1.app/msw");
    initMsw();
  }
}
