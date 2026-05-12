# Apps Hub

Central Next.js hub for app intro pages, privacy policies, terms pages, and App Store Connect support URLs.

Managed apps:

- EchoVault
- DuetShot
- Found
- ScholarDaily
- Kodda

## Development

```bash
npm run dev
```

[DONE]

```bash
npm test
```

[DONE]

```bash
npm run lint
```

[DONE]

## Add An App

Edit `src/content/apps.ts` and add one object to the `apps` array.

Required fields:

- `slug`
- `name`
- `tagline`
- `summary`
- `platforms`
- `status`
- `websiteUrl` for web apps
- `supportEmail`
- `legalOwner`
- `privacyUpdatedAt`
- `termsUpdatedAt`
- `icon`
- `screenshots`
- `accentColor`
- `features`
- `policyProfile`

## App Store URLs

Each app automatically gets:

- Intro: `/apps/[slug]`
- Privacy: `/apps/[slug]/privacy`
- Terms: `/apps/[slug]/terms`

Use those URLs in App Store Connect for each app's marketing, privacy, and terms fields.

Web apps should also include a production `websiteUrl`; Kodda uses `https://kodda.dev`.

## Deployment

Deploy on Vercel.

Set `NEXT_PUBLIC_SITE_URL` to the final production origin so `sitemap.xml`, `robots.txt`, metadata, and App Store URLs use the canonical domain.

## MiniMax Proxy API

Use `POST /api/minimax/chat/tkn_8be467f58f65a4d34681fa2c31499966e844e39d5f1fc04b122d78f943e9c5f6efeb1e024c86bf56a2e33ac13a051552720f0282be3089572bfe46a3908f1bae` for shared app calls to MiniMax `MiniMax-M2.7-highspeed`.

The route accepts either `prompt` or `messages` and returns a complete JSON response with `text`, `model`, and optional `usage`. It strips MiniMax `<think>` blocks before returning `text` and does not support streaming.

Set `MINIMAX_API_KEY` in production. `MINIMAX_API_HOST` defaults to MiniMax's public API host. Local development (when `NODE_ENV !== "production"`) can fall back to the MiniMax values in `~/.config/opencode/opencode.json`; that fallback is disabled in production so a developer's personal key can never serve public traffic.

The path itself acts as a secret — a random 64-char hex string. Without knowing the exact path, attackers get `404`. No auth token or env var needed.

Optional rate-limit settings (best-effort, per-instance soft cap):

- `MINIMAX_PROXY_RATE_LIMIT`, default `30`
- `MINIMAX_PROXY_RATE_WINDOW_MS`, default `60000`

## Spec

The first product spec lives in `docs/initial-spec.md`.
