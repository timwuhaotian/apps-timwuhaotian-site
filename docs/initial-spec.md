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
- `heroImage`
- `accentColor`
- `features`

Policy content can start from shared templates with per-app overrides.

## Management Model

The preferred first implementation is file-based data.

Use `src/content/apps.ts` as the single source of truth, then generate all app routes from it.

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
2. Do privacy and terms pages share one universal policy, or does every app need app-specific wording?
3. Should app pages be content-managed through TypeScript files, Markdown/MDX, or a lightweight admin later?
4. Do you want every app page indexed by search engines, or should policy pages be mostly utility pages?
5. Should each app have screenshots and icons in this first version, or start with text-only entries?
6. Which apps should be included in the seed data?
7. What is the canonical support email and legal owner name?
8. Are apps mostly iOS-only, or do some need Android/web/platform-specific policy language?
9. Do you want the site bilingual now, or English-only first?
10. Should generated privacy/terms copy be strict and minimal, or more user-friendly and explanatory?

## First Build Acceptance Criteria

- A clean Next.js + Tailwind + TypeScript project exists in this folder.
- App data is centralized.
- Home page lists seed apps from the centralized data source.
- Intro, privacy, and terms routes work for every seed app.
- Tests validate the app data and route contract.
- The README explains how to add a new app and where to put App Store URLs.
