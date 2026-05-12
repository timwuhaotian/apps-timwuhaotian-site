import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";

export const runtime = "nodejs";

const MINIMAX_MODEL = "MiniMax-M2.7-highspeed";
const DEFAULT_MINIMAX_HOST = "https://api.minimax.io";
const OPENCODE_CONFIG_PATH = path.join(
  homedir(),
  ".config",
  "opencode",
  "opencode.json",
);

type MiniMaxMessage = {
  content: string;
  name?: string;
  role: "assistant" | "system" | "user";
};

type MiniMaxProxyBody = {
  max_completion_tokens?: unknown;
  messages?: unknown;
  prompt?: unknown;
  temperature?: unknown;
  top_p?: unknown;
};

type RateBucket = {
  count: number;
  resetAt: number;
};

const rateBuckets = new Map<string, RateBucket>();

export async function OPTIONS(request: Request) {
  return new Response(null, {
    headers: corsHeadersFor(request),
    status: 204,
  });
}

export async function POST(request: Request) {
  const headers = corsHeadersFor(request);

  const rateLimit = checkRateLimit(request);

  if (!rateLimit.allowed) {
    return Response.json(
      {
        error: "Rate limit exceeded",
        retryAfterSeconds: rateLimit.retryAfterSeconds,
      },
      {
        headers,
        status: 429,
      },
    );
  }

  const body = await readJsonBody(request);

  if (!body.ok) {
    return Response.json({ error: body.error }, { headers, status: 400 });
  }

  const payload = buildMiniMaxPayload(body.value);

  if (!payload.ok) {
    return Response.json({ error: payload.error }, { headers, status: 400 });
  }

  const config = await getMiniMaxConfig();
  const apiKey = config.apiKey;

  if (!apiKey) {
    return Response.json(
      { error: "MiniMax API key is not configured" },
      { headers, status: 503 },
    );
  }

  const upstream = await callMiniMax({ ...config, apiKey }, payload.value);
  const data = await readUpstreamJson(upstream);

  if (!upstream.ok) {
    return Response.json(
      {
        error: "MiniMax request failed",
        status: upstream.status,
      },
      { headers, status: 502 },
    );
  }

  const rawText = extractText(data);
  const text = rawText ? stripThinkingBlocks(rawText) : undefined;

  if (!text) {
    return Response.json(
      { error: "MiniMax response did not include final assistant text" },
      { headers, status: 502 },
    );
  }

  return Response.json(
    {
      model: MINIMAX_MODEL,
      text,
      usage: objectField(data, "usage"),
    },
    { headers },
  );
}

export function resetMiniMaxProxyForTests() {
  rateBuckets.clear();
}

async function callMiniMax(
  config: { apiHost: string; apiKey: string },
  body: Record<string, unknown>,
) {
  return fetch(`${trimTrailingSlash(config.apiHost)}/v1/chat/completions`, {
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

async function getMiniMaxConfig() {
  // The opencode config holds a developer's personal MiniMax key and must
  // never serve public traffic — restrict the fallback to non-production.
  const opencode = isProduction()
    ? { apiHost: undefined, apiKey: undefined }
    : await readOpenCodeMiniMaxConfig();

  return {
    apiHost:
      cleanString(process.env.MINIMAX_API_HOST) ??
      opencode.apiHost ??
      DEFAULT_MINIMAX_HOST,
    apiKey: cleanString(process.env.MINIMAX_API_KEY) ?? opencode.apiKey,
  };
}

async function readOpenCodeMiniMaxConfig() {
  try {
    const raw = await readFile(OPENCODE_CONFIG_PATH, "utf8");
    const parsed: unknown = JSON.parse(raw);

    return {
      apiHost: stringAt(parsed, [
        "mcp",
        "MiniMax",
        "environment",
        "MINIMAX_API_HOST",
      ]),
      apiKey: stringAt(parsed, [
        "mcp",
        "MiniMax",
        "environment",
        "MINIMAX_API_KEY",
      ]),
    };
  } catch {
    return {
      apiHost: undefined,
      apiKey: undefined,
    };
  }
}

async function readJsonBody(request: Request) {
  try {
    const parsed: unknown = await request.json();

    if (!isRecord(parsed)) {
      return failure("Request body must be a JSON object");
    }

    return success(parsed as MiniMaxProxyBody);
  } catch {
    return failure("Request body must be valid JSON");
  }
}

function buildMiniMaxPayload(body: MiniMaxProxyBody) {
  const messages = normalizeMessages(body);

  if (!messages.ok) {
    return messages;
  }

  const payload: Record<string, unknown> = {
    messages: messages.value,
    model: MINIMAX_MODEL,
    stream: false,
  };

  copyNumber(body, payload, "temperature");
  copyNumber(body, payload, "top_p");
  copyNumber(body, payload, "max_completion_tokens");

  return success(payload);
}

function normalizeMessages(body: MiniMaxProxyBody) {
  if (Array.isArray(body.messages)) {
    return normalizeMessageList(body.messages);
  }

  if (typeof body.prompt === "string" && body.prompt.trim()) {
    return success([{ content: body.prompt, role: "user" } satisfies MiniMaxMessage]);
  }

  return failure("Provide a non-empty prompt or messages array");
}

function normalizeMessageList(messages: unknown[]) {
  const normalized: MiniMaxMessage[] = [];

  for (const message of messages) {
    if (!isRecord(message)) {
      return failure("Each message must be an object");
    }

    const role = message.role;
    const content = message.content;

    if (!isRole(role) || typeof content !== "string" || !content.trim()) {
      return failure("Each message needs role and non-empty content");
    }

    normalized.push({
      content,
      name: cleanString(message.name),
      role,
    });
  }

  if (normalized.length === 0) {
    return failure("Provide at least one message");
  }

  return success(normalized);
}

function copyNumber(
  source: MiniMaxProxyBody,
  target: Record<string, unknown>,
  key: "max_completion_tokens" | "temperature" | "top_p",
) {
  const value = source[key];

  if (typeof value === "number" && Number.isFinite(value)) {
    target[key] = value;
  }
}

function isProduction() {
  return process.env.NODE_ENV === "production";
}

// In-memory, per-instance rate limit. Vercel serverless functions can run
// across multiple warm instances and reset on cold starts, so treat this as a
// best-effort soft cap layered on top of the upstream API key protection.
function checkRateLimit(request: Request) {
  const now = Date.now();
  const limit = readPositiveInt(process.env.MINIMAX_PROXY_RATE_LIMIT, 30);
  const windowMs = readPositiveInt(
    process.env.MINIMAX_PROXY_RATE_WINDOW_MS,
    60_000,
  );
  const key = clientKey(request);
  const bucket = rateBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      retryAfterSeconds: 0,
    };
  }

  if (bucket.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;

  return {
    allowed: true,
    retryAfterSeconds: 0,
  };
}

function clientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function corsHeadersFor(request: Request) {
  const headers = new Headers({
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  });
  const origin = request.headers.get("origin");

  if (origin && isOriginAllowed(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
  }

  return headers;
}

function isOriginAllowed(origin: string) {
  const allowed = parseAllowedOrigins();

  return allowed.includes("*") || allowed.includes(origin);
}

async function readUpstreamJson(response: Response) {
  try {
    return (await response.json()) as unknown;
  } catch {
    return undefined;
  }
}

function extractText(data: unknown) {
  if (!isRecord(data)) {
    return undefined;
  }

  const choices = data.choices;

  if (!Array.isArray(choices)) {
    return undefined;
  }

  const first = choices[0];
  const message = isRecord(first) ? first.message : undefined;
  const content = isRecord(message) ? message.content : undefined;

  return typeof content === "string" && content.length > 0 ? content : undefined;
}

function stripThinkingBlocks(text: string) {
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<think>[\s\S]*?(?=\n\n|$)/gi, "")
    .trim();
}

function stringAt(value: unknown, keys: string[]) {
  let current = value;

  for (const key of keys) {
    if (!isRecord(current)) {
      return undefined;
    }

    current = current[key];
  }

  return cleanString(current);
}

function objectField(value: unknown, key: string) {
  if (!isRecord(value)) {
    return undefined;
  }

  return isRecord(value[key]) ? value[key] : undefined;
}

function cleanString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isRole(value: unknown): value is MiniMaxMessage["role"] {
  return value === "assistant" || value === "system" || value === "user";
}

function readPositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function success<T>(value: T) {
  return {
    ok: true as const,
    value,
  };
}

function failure(error: string) {
  return {
    error,
    ok: false as const,
  };
}
