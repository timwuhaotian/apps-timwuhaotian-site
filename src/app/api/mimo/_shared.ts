// Shared helpers for the Xiaomi MiMo proxy routes. Mirrors the conventions of
// this project's MiniMax proxy (in-memory soft rate limit, CORS allow-list,
// env-based key) but targets MiMo's Token Plan endpoint, which authenticates
// with an `api-key` header. The Token Plan key lives in MIMO_API_KEY (Vercel
// env) and never reaches the EchoVault mobile client.
export const MIMO_DEFAULT_HOST = "https://token-plan-cn.xiaomimimo.com/v1";

type RateBucket = { count: number; resetAt: number };

const rateBuckets = new Map<string, RateBucket>();

export function resetMimoProxyForTests() {
  rateBuckets.clear();
}

export function corsHeadersFor(request: Request) {
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
  const allowed = (process.env.MIMO_PROXY_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  // Mobile (React Native) callers send no Origin header, so this only gates
  // browser traffic.
  return allowed.includes("*") || allowed.includes(origin);
}

// In-memory, per-instance soft cap. Serverless instances reset on cold starts,
// so treat this as best-effort protection layered on top of the upstream key.
export function checkRateLimit(request: Request) {
  const now = Date.now();
  const limit = readPositiveInt(process.env.MIMO_PROXY_RATE_LIMIT, 200);
  const windowMs = readPositiveInt(process.env.MIMO_PROXY_RATE_WINDOW_MS, 60_000);
  const key = clientKey(request);
  const bucket = rateBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true as const, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    return {
      allowed: false as const,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { allowed: true as const, retryAfterSeconds: 0 };
}

function clientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function mimoHost() {
  return trimTrailingSlash(cleanString(process.env.MIMO_API_HOST) ?? MIMO_DEFAULT_HOST);
}

export function mimoApiKey() {
  return cleanString(process.env.MIMO_API_KEY);
}

export async function readUpstreamJson(response: Response) {
  try {
    return (await response.json()) as unknown;
  } catch {
    return undefined;
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function cleanString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function readPositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}
