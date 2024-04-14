export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.MOCKING === "true") {
    const { server } = await import("@/1.app/msw");
    server.listen();
  }
}
