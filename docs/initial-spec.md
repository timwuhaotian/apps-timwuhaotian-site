# Apps Hub Initial Spec

## Purpose

Build a central public hub for apps created by Tim Wu Haotian.

The site should make it easy to list each app, explain what it does, and provide stable App Store support URLs for privacy policies, terms, and app intro pages.

## Target Users

- App Store reviewers who need policy and support URLs.
- Users who land from an app listing or support link.
- Tim, who needs a simple way to add and maintain app pages.

## Product Shape

The first version should be a static-friendly Next.js app using TypeScript and Tailwind CSS.

App data should live in one structured source so adding an app does not require copying page code.

## Route Structure

- `/` lists all apps.
- `/apps/[slug]` shows the app intro page.
- `/apps/[slug]/privacy` shows the app privacy policy.
- `/apps/[slug]/terms` shows the app terms page.

Optional later routes:

- `/apps/[slug]/support`
- `/apps/[slug]/press`
- `/apps/[slug]/changelog`

## App Data Model

Each app should support:

- `slug`
- `name`
- `tagline`
- `summary`
- `platforms`
- `status`
- `appStoreUrl`
- `supportEmail`
- `privacyUpdatedAt`
- `termsUpdatedAt`
- `icon`
- `screenshots`
- `accentColor`
- `features`

Policy content should be tailored per app while reusing a shared renderer.

## Management Model

The preferred first implementation is file-based data.

Use `src/content/apps.ts` as the single source of truth, then generate all app routes from it.

Current managed apps:

- EchoVault
- DuetShot
- Found
- ScholarDaily

## Visual Direction

The UI should feel like a quiet product directory, not a marketing landing page.

The home page should prioritize scanability: app name, short intro, platform, status, and links to intro/privacy/terms.

## TDD Plan

Start with tests around the route/content contract before styling polish.

Suggested coverage:

- Every app has valid required fields.
- Every app slug is unique.
- Home page renders all app names.
- App intro, privacy, and terms pages render for each slug.
- Unknown slugs return `notFound`.

## Initial Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vitest for data contract tests
- React Testing Library for page/component tests if needed

## Open Decisions

1. Should this hub be personal-brand first (`timwuhaotian.com/apps`) or app-directory first (`apps.timwuhaotian.com`)?
2. Resolved: privacy and terms pages use tailored per-app profiles.
3. Resolved for v1: content is managed in TypeScript files.
4. Resolved: all app pages and policy pages should be indexed.
5. Resolved: each app should have an icon; screenshots are included when available.
6. Resolved: seed apps are EchoVault, DuetShot, Found, and ScholarDaily.
7. Resolved: support email is `timmy.wu@hotmail.com`; legal owner is `WU HAOTIAN`.
8. Mostly iOS-first today, with platform-specific policy language.
9. Resolved: English first.
10. Resolved: privacy/terms copy should be strict enough for App Store URLs but still readable.

## First Build Acceptance Criteria

- A clean Next.js + Tailwind + TypeScript project exists in this folder.
- App data is centralized.
- Home page lists EchoVault, DuetShot, Found, and ScholarDaily from the centralized data source.
- Intro, privacy, and terms routes work for every seed app.
- Tests validate the app data and route contract.
- The README explains how to add a new app and where to put App Store URLs.
- Vercel deployment is supported with `NEXT_PUBLIC_SITE_URL`.
