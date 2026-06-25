import {
  checkAppSecret,
  checkRateLimit,
  corsHeadersFor,
  isRecord,
  mimoApiKey,
  mimoHost,
  readUpstreamJson,
} from "../_shared";

export const runtime = "nodejs";

// Xiaomi MiMo text completion proxy. The EchoVault app posts
// { model, messages, temperature, max_tokens, response_format } and reads the
// passed-through OpenAI completion (choices[0].message.content). response_format
// is forwarded because the extraction call relies on JSON mode to suppress the
// reasoning tokens these models would otherwise emit.
const DEFAULT_CHAT_MODEL = "mimo-v2-pro";

export async function OPTIONS(request: Request) {
  return new Response(null, { headers: corsHeadersFor(request), status: 204 });
}

export async function POST(request: Request) {
  const headers = corsHeadersFor(request);

  const rateLimit = checkRateLimit(request);
  if (!rateLimit.allowed) {
    return Response.json(
      { error: "Rate limit exceeded", retryAfterSeconds: rateLimit.retryAfterSeconds },
      { headers, status: 429 },
    );
  }

  const appSecret = checkAppSecret(request);
  if (!appSecret.ok) {
    return Response.json({ error: "Unauthorized" }, { headers, status: 401 });
  }

  const apiKey = mimoApiKey();
  if (!apiKey) {
    return Response.json({ error: "MIMO_API_KEY is not configured" }, { headers, status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON" }, { headers, status: 400 });
  }

  if (!isRecord(body) || !Array.isArray(body.messages)) {
    return Response.json({ error: "messages[] is required" }, { headers, status: 400 });
  }

  const upstream = await safeFetch(
    `${mimoHost()}/chat/completions`,
    {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: DEFAULT_CHAT_MODEL,
        messages: body.messages,
        temperature: typeof body.temperature === "number" ? body.temperature : 0.1,
        max_tokens: typeof body.max_tokens === "number" ? body.max_tokens : 1024,
        ...(isRecord(body.response_format) ? { response_format: body.response_format } : {}),
      }),
    },
    headers,
  );

  const data = await readUpstreamJson(upstream);
  if (!upstream.ok) {
    return Response.json(
      { error: "mimo-upstream-error" },
      { headers, status: upstream.status === 401 ? 503 : upstream.status },
    );
  }
  if (data === undefined) {
    return Response.json({ error: "mimo-upstream-error" }, { headers, status: 502 });
  }
  return Response.json(data, { headers });
}

// Wraps fetch so a network/transport failure returns a clean 502 instead of
// surfacing as an unhandled promise rejection.
async function safeFetch(
  input: string,
  init: RequestInit,
  headers: Headers,
): Promise<Response> {
  try {
    return await fetch(input, init);
  } catch {
    return Response.json(
      { error: "mimo-upstream-unreachable" },
      { headers, status: 502 },
    );
  }
}
