import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  POST,
  resetMiniMaxProxyForTests,
} from "@/app/api/minimax/chat/tkn_8be467f58f65a4d34681fa2c31499966e844e39d5f1fc04b122d78f943e9c5f6efeb1e024c86bf56a2e33ac13a051552720f0282be3089572bfe46a3908f1bae/route";

const originalEnv = { ...process.env };

const PATH_TOKEN =
  "tkn_8be467f58f65a4d34681fa2c31499966e844e39d5f1fc04b122d78f943e9c5f6efeb1e024c86bf56a2e33ac13a051552720f0282be3089572bfe46a3908f1bae";

describe("MiniMax chat proxy route", () => {
  beforeEach(() => {
    process.env = {
      ...originalEnv,
      MINIMAX_API_HOST: "https://api.minimaxi.com",
      MINIMAX_API_KEY: "test-minimax-key",
      MINIMAX_PROXY_RATE_LIMIT: "2",
      MINIMAX_PROXY_RATE_WINDOW_MS: "60000",
    };
    resetMiniMaxProxyForTests();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env = originalEnv;
    resetMiniMaxProxyForTests();
  });

  it("returns complete assistant text from MiniMax without streaming", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({
        choices: [
          {
            message: {
              content: "Hello from MiniMax.",
            },
          },
        ],
        usage: {
          total_tokens: 12,
        },
      }),
    );

    const response = await POST(jsonRequest({ prompt: "Say hello" }));

    await expect(response.json()).resolves.toEqual({
      model: "MiniMax-M2.7-highspeed",
      text: "Hello from MiniMax.",
      usage: {
        total_tokens: 12,
      },
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.minimaxi.com/v1/chat/completions",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-minimax-key",
          "Content-Type": "application/json",
        }),
        method: "POST",
      }),
    );

    expect(sentBody(fetchMock)).toMatchObject({
      messages: [{ content: "Say hello", role: "user" }],
      model: "MiniMax-M2.7-highspeed",
      stream: false,
    });
  });

  it("rate limits repeated calls from the same client before MiniMax", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(jsonResponse({ choices: [{ message: { content: "ok" } }] }));

    process.env.MINIMAX_PROXY_RATE_LIMIT = "1";

    const first = await POST(jsonRequest({ prompt: "first" }));
    const second = await POST(jsonRequest({ prompt: "second" }));

    expect(first.status).toBe(200);
    expect(second.status).toBe(429);
    expect(await second.json()).toEqual({
      error: "Rate limit exceeded",
      retryAfterSeconds: 60,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("removes MiniMax thinking blocks from the returned text", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({
        choices: [
          {
            message: {
              content:
                "<think>\nReasoning should stay private.\n\nFinal answer only.",
            },
          },
        ],
      }),
    );

    const response = await POST(jsonRequest({ prompt: "Give the final answer" }));

    await expect(response.json()).resolves.toMatchObject({
      text: "Final answer only.",
    });
  });

  it("does not fall back to the local opencode config in production", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    process.env.NODE_ENV = "production";
    delete process.env.MINIMAX_API_KEY;

    const response = await POST(jsonRequest({ prompt: "Hi" }));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: "MiniMax API key is not configured",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

function jsonRequest(body: unknown, ip = "203.0.113.1") {
  return new Request(`https://apps.example.test/api/minimax/chat/${PATH_TOKEN}`, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    method: "POST",
  });
}

function jsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
    },
    status: init?.status ?? 200,
  });
}

function sentBody(fetchMock: ReturnType<typeof vi.spyOn<typeof globalThis, "fetch">>) {
  const init = fetchMock.mock.calls[0]?.[1];
  return JSON.parse(String(init?.body));
}