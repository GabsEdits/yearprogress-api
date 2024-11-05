import { Hono } from "jsr:@hono/hono";

const now = new Date();
const dayOfYear = Math.floor(
  (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) /
    (1000 * 60 * 60 * 24),
);
const progress = (dayOfYear / 365) * 100;

const app = new Hono();

const routes = {
  "/": {
    progress: progress.toFixed(2) + "%",
    days: dayOfYear,
    remaining: (100 - progress).toFixed(2) + "%",
  },
  "/days": { dayOfYear },
  "/precentage": { procentage: progress.toFixed(2) + "%" },
  "/remaining": { remaining: (100 - progress).toFixed(2) + "%" },
  "/decimal": { decimal: (dayOfYear / 365).toFixed(2) },
  "/remaining/days": { remaining: 365 - dayOfYear },
};

Object.entries(routes).forEach(([path, data]) =>
  app.get(path, (c) => c.json(data))
);

app.notFound((c) => c.text("Not Found", 404));

Deno.serve(app.fetch);

export { app };
