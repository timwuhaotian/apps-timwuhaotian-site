import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { resetMimoProxyForTests } from "@/app/api/mimo/_shared";
import { POST } from "@/app/api/mimo/chat/route";

const originalEnv = { ...process.env };

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
    status,
  });
}

function chatRequest(body: unknown) {
  return new Request("https://apps.timwuhaotian.dev/api/mimo/chat", {
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
}

describe("MiMo chat proxy route", () => {
  beforeEach(() => {
    process.env = { ...originalEnv, MIMO_API_KEY: "test-mimo-key" };
    resetMimoProxyForTests();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env = originalEnv;
    resetMimoProxyForTests();
  });

  it("forwards messages + response_format with api-key auth and passes the completion through", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(jsonResponse({ choices: [{ message: { content: '{"actions":[]}' } }] }));

    const res = await POST(
      chatRequest({
        messages: [{ content: "hi", role: "user" }],
        response_format: { type: "json_object" },
      }),
    );

    expect(res.status).toBe(200);
    const data = (await res.json()) as { choices: { message: { content: string } }[] };
    expect(data.choices[0].message.content).toBe('{"actions":[]}');

    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const sent = JSON.parse(init.body as string) as Record<string, unknown>;
    expect(sent.model).toBe("mimo-v2-pro");
    expect(sent.response_format).toEqual({ type: "json_object" });
    expect((init.headers as Record<string, string>)["api-key"]).toBe("test-mimo-key");
  });

  it("returns 503 when MIMO_API_KEY is not configured", async () => {
    delete process.env.MIMO_API_KEY;
    const res = await POST(chatRequest({ messages: [{ content: "hi", role: "user" }] }));
    expect(res.status).toBe(503);
  });

  it("returns 400 when messages are missing", async () => {
    const res = await POST(chatRequest({}));
    expect(res.status).toBe(400);
  });
});
