const now = new Date();
const start = new Date(now.getFullYear(), 0, 0);
const diff = now.getTime() - start.getTime();
const oneDay = 1000 * 60 * 60 * 24;
const dayOfYear = Math.floor(diff / oneDay);

export const handler = (req: Request): Response => {
  const url = new URL(req.url);
  if (url.pathname === "/year-progress") {
    const progress = (dayOfYear / 365) * 100;
    const body = JSON.stringify({
      progress: progress.toFixed(2) + "%",
      days: dayOfYear,
      remaining: (100 - progress).toFixed(2) + "%",
    });
    return new Response(body, { status: 200, headers: { "Content-Type": "application/json" } });
  } else if (url.pathname === "/day-of-year") {
    const body = JSON.stringify({ dayOfYear });
    return new Response(body, { status: 200, headers: { "Content-Type": "application/json" } });
  } else {
    return new Response("Not Found", { status: 404 });
  }
};

Deno.serve((req: Request) => handler(req));
