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

## Spec

The first product spec lives in `docs/initial-spec.md`.
