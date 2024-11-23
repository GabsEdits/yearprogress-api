import { Hono } from "jsr:@hono/hono";

const now = new Date();
const dayOfYear = Math.floor(
  (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) /
    (1000 * 60 * 60 * 24),
);
const progress = (dayOfYear / 365) * 100;
const daysInYear =
  (now.getFullYear() % 4 === 0 && now.getFullYear() % 100 !== 0) ||
    now.getFullYear() % 400 === 0
    ? 366
    : 365;

const app = new Hono();

const routes = {
  "/": {
    progress: progress.toFixed(2) + "%",
    day: dayOfYear,
    remaining: {
      percentage: (100 - progress).toFixed(2) + "%",
      daysLeft: daysInYear - dayOfYear,
    },
    year: now.getFullYear(),
    currentDateTime: now.toISOString(),
  },
  "/days": {
    message: "Current day of the year",
    dayOfYear,
  },
  "/percentage": {
    message: "Year progress percentage",
    percentage: progress.toFixed(2) + "%",
  },
  "/remaining": {
    message: "Remaining percentage of the year",
    remaining: (100 - progress).toFixed(2) + "%",
  },
  "/decimal": {
    message: "Year progress in decimal",
    decimal: (dayOfYear / 365).toFixed(2),
  },
  "/remaining/days": {
    message: "Days remaining in the year",
    remaining: daysInYear - dayOfYear,
  },
  "/time": {
    message: "Current server time",
    time: now.toISOString(),
  },
};

Object.entries(routes).forEach(([path, data]) =>
  app.get(path, (c) => c.json(data))
);

app.notFound((c) => c.text("Not Found", 404));

Deno.serve(app.fetch);

export { app };
