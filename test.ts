import { app } from "./mod.ts";
import { assertEquals, assertStrictEquals } from "jsr:@std/assert";

async function testEndpoint(
  url: string,
  expectedStatus: number,
  expectedContentType: string,
  expectedBodyTypes: Record<string, string>,
) {
  const req = new Request(url);
  const res = await app.request(req);
  const body = await res.json();
  assertEquals(
    res.status,
    expectedStatus,
    `Expected status ${expectedStatus}, got ${res.status}`,
  );
  assertEquals(
    res.headers.get("Content-Type")?.split(";")[0],
    expectedContentType,
    `Expected Content-Type ${expectedContentType}, got ${
      res.headers.get("Content-Type")
    }`,
  );
  for (const [key, type] of Object.entries(expectedBodyTypes)) {
    assertStrictEquals(
      typeof body[key],
      type,
      `Expected body.${key} to be ${type}, got ${typeof body[key]}`,
    );
  }
}

Deno.test("GET /", async () => {
  await testEndpoint("http://localhost/", 200, "application/json", {
    progress: "string",
    days: "number",
    remaining: "string",
  });
});

Deno.test("GET /days", async () => {
  await testEndpoint("http://localhost/days", 200, "application/json", {
    dayOfYear: "number",
  });
});

Deno.test("GET /precentage", async () => {
  await testEndpoint("http://localhost/precentage", 200, "application/json", {
    procentage: "string",
  });
});

Deno.test("GET /remaining", async () => {
  await testEndpoint("http://localhost/remaining", 200, "application/json", {
    remaining: "string",
  });
});

Deno.test("GET /decimal", async () => {
  await testEndpoint("http://localhost/decimal", 200, "application/json", {
    decimal: "string",
  });
});

Deno.test("GET /remaining/days", async () => {
  await testEndpoint(
    "http://localhost/remaining/days",
    200,
    "application/json",
    {
      remaining: "number",
    },
  );
});

Deno.test("GET /notfound", async () => {
  const req = new Request("http://localhost/notfound");
  const res = await app.request(req);
  assertEquals(res.status, 404, `Expected status 404, got ${res.status}`);
});
