import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { resetMimoProxyForTests } from "@/app/api/mimo/_shared";
import { POST } from "@/app/api/mimo/asr/route";

const originalEnv = { ...process.env };

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
    status,
  });
}

function asrRequest(body: unknown) {
  return new Request("https://apps.timwuhaotian.dev/api/mimo/asr", {
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
}

describe("MiMo ASR proxy route", () => {
  beforeEach(() => {
    process.env = { ...originalEnv, MIMO_API_KEY: "test-mimo-key" };
    resetMimoProxyForTests();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env = originalEnv;
    resetMimoProxyForTests();
  });

  it("returns a flat { text, seconds } transcript", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({ choices: [{ message: { content: "hello world" } }], usage: { seconds: 5 } }),
    );

    const res = await POST(asrRequest({ audioBase64: "YmFzZTY0", language: "auto", mime: "audio/wav" }));

    expect(res.status).toBe(200);
    const data = (await res.json()) as { seconds: number; text: string };
    expect(data.text).toBe("hello world");
    expect(data.seconds).toBe(5);
  });

  it("returns 400 without audioBase64", async () => {
    const res = await POST(asrRequest({}));
    expect(res.status).toBe(400);
  });
});
