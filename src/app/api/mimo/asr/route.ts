import {
  checkRateLimit,
  cleanString,
  corsHeadersFor,
  isRecord,
  mimoApiKey,
  mimoHost,
  readUpstreamJson,
} from "../_shared";

export const runtime = "nodejs";

// Xiaomi MiMo speech-to-text proxy. The EchoVault app posts
// { audioBase64, mime, language } and reads a flat { text, seconds }. We build
// the input_audio message here so the multi-MB base64 stays off the public
// OpenAI-shaped contract.
const ASR_MODEL = "mimo-v2.5-asr";

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

  const audioBase64 = isRecord(body) ? cleanString(body.audioBase64) : undefined;
  if (!audioBase64) {
    return Response.json({ error: "audioBase64 is required" }, { headers, status: 400 });
  }
  const mime = (isRecord(body) && cleanString(body.mime)) || "audio/wav";
  const language = (isRecord(body) && cleanString(body.language)) || "auto";

  const upstream = await fetch(`${mimoHost()}/chat/completions`, {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: ASR_MODEL,
      messages: [
        {
          role: "user",
          content: [
            { type: "input_audio", input_audio: { data: `data:${mime};base64,${audioBase64}` } },
          ],
        },
      ],
      asr_options: { language },
    }),
  });

  const data = await readUpstreamJson(upstream);
  if (!upstream.ok) {
    return Response.json(data ?? { error: "mimo-upstream-error" }, {
      headers,
      status: upstream.status,
    });
  }

  return Response.json({ text: extractText(data), seconds: extractSeconds(data) }, { headers });
}

function extractText(data: unknown) {
  if (!isRecord(data) || !Array.isArray(data.choices)) return "";
  const first = data.choices[0];
  const message = isRecord(first) ? first.message : undefined;
  const content = isRecord(message) ? message.content : undefined;
  return typeof content === "string" ? content : "";
}

function extractSeconds(data: unknown) {
  if (!isRecord(data) || !isRecord(data.usage)) return null;
  const seconds = data.usage.seconds;
  return typeof seconds === "number" ? seconds : null;
}
