import { app } from "./mod.ts";
import { assertEquals, assertStrictEquals } from "jsr:@std/assert";

async function testEndpoint(
  url: string,
  expectedStatus: number,
  expectedContentType: string,
  expectedBodyTypes: Record<string, string> = {},
) {
  const req = new Request(url);
  const res = await app.request(req);
  let body;
  try {
    body = await res.json();
  } catch (_e) {
    body = {};
  }
  assertEquals(
    res.status,
    expectedStatus,
    `Expected status ${expectedStatus}, got ${res.status}`,
  );
  if (expectedContentType) {
    assertEquals(
      res.headers.get("Content-Type")?.split(";")[0],
      expectedContentType,
      `Expected Content-Type ${expectedContentType}, got ${
        res.headers.get("Content-Type")
      }`,
    );
  }
  for (const [key, type] of Object.entries(expectedBodyTypes)) {
    assertStrictEquals(
      typeof body[key],
      type,
      `Expected body.${key} to be ${type}, got ${typeof body[key]}`,
    );
  }
}

const testCases: Array<{
  url: string;
  expectedStatus: number;
  expectedContentType: string;
  expectedBodyTypes: Record<string, string>;
}> = [
  {
    url: "http://localhost/",
    expectedStatus: 200,
    expectedContentType: "application/json",
    expectedBodyTypes: {
      progress: "string",
      day: "number",
      "remaining.percentage": "undefined",
      "remaining.daysLeft": "undefined",
    },
  },
  {
    url: "http://localhost/days",
    expectedStatus: 200,
    expectedContentType: "application/json",
    expectedBodyTypes: { dayOfYear: "number" },
  },
  {
    url: "http://localhost/percentage",
    expectedStatus: 200,
    expectedContentType: "application/json",
    expectedBodyTypes: { percentage: "string" },
  },
  {
    url: "http://localhost/remaining",
    expectedStatus: 200,
    expectedContentType: "application/json",
    expectedBodyTypes: { remaining: "string" },
  },
  {
    url: "http://localhost/decimal",
    expectedStatus: 200,
    expectedContentType: "application/json",
    expectedBodyTypes: { decimal: "string" },
  },
  {
    url: "http://localhost/remaining/days",
    expectedStatus: 200,
    expectedContentType: "application/json",
    expectedBodyTypes: { remaining: "number" },
  },
  {
    url: "http://localhost/notfound",
    expectedStatus: 404,
    expectedContentType: "",
    expectedBodyTypes: {},
  },
];

for (
  const { url, expectedStatus, expectedContentType, expectedBodyTypes }
    of testCases
) {
  Deno.test(`GET ${url}`, async () => {
    await testEndpoint(
      url,
      expectedStatus,
      expectedContentType,
      expectedBodyTypes,
    );
  });
}
