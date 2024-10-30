const now = new Date();
const start = new Date(now.getFullYear(), 0, 0);
const diff = now.getTime() - start.getTime();
const oneDay = 1000 * 60 * 60 * 24;
const dayOfYear = Math.floor(diff / oneDay);
const progress = (dayOfYear / 365) * 100;

const jsonResponse = (body: object): Response => {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const handler = (req: Request): Response => {
  const url = new URL(req.url);
  switch (url.pathname) {
    case "/":
      return jsonResponse({
        progress: progress.toFixed(2) + "%",
        days: dayOfYear,
        remaining: (100 - progress).toFixed(2) + "%",
      });
    case "/days":
      return jsonResponse({ dayOfYear });
    case "/precentage":
      return jsonResponse({ procentage: progress.toFixed(2) + "%" });
    case "/remaining":
      return jsonResponse({ remaining: (100 - progress).toFixed(2) + "%" });
    case "/decimal":
      return jsonResponse({ decimal: (dayOfYear / 365).toFixed(2) });
    case "/remaining/days":
      return jsonResponse({ remaining: 365 - dayOfYear });
    default:
      return new Response("Not Found", { status: 404 });
  }
};

Deno.serve((req: Request) => handler(req));
