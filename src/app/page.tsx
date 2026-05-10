/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { apps, getAppRoutes } from "@/content/apps";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-8 sm:px-8 lg:px-10">
        <header className="grid gap-8 border-b border-zinc-200 pb-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-teal-700">
              Apps by Tim Wu Haotian
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-normal sm:text-5xl">
              App pages, policies, and support links in one place.
            </h1>
          </div>

          <p className="max-w-xl self-end text-base leading-7 text-zinc-600">
            A compact directory for products I build, with stable intro,
            privacy, and terms URLs for App Store review and users.
          </p>
        </header>

        <section className="grid gap-4">
          {apps.map((app) => (
            <AppRow app={app} key={app.slug} />
          ))}
        </section>
      </div>
    </main>
  );
}

function AppRow({ app }: { app: (typeof apps)[number] }) {
  const routes = getAppRoutes(app);

  return (
    <article className="grid gap-5 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm sm:grid-cols-[1fr_auto] sm:items-center">
      <div className="flex gap-4">
        <img
          alt={`${app.name} icon`}
          className="h-14 w-14 shrink-0 rounded-xl"
          src={app.icon}
        />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold">{app.name}</h2>
            <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600">
              {app.status}
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
            {app.tagline}
          </p>
          <p className="mt-2 text-xs font-medium text-zinc-500">
            {app.platforms.join(", ")}
          </p>
        </div>
      </div>

      <nav className="flex flex-wrap gap-2 text-sm font-medium">
        <Link className="rounded-md border px-3 py-2" href={routes.intro}>
          Intro
        </Link>
        <Link className="rounded-md border px-3 py-2" href={routes.privacy}>
          Privacy
        </Link>
        <Link className="rounded-md border px-3 py-2" href={routes.terms}>
          Terms
        </Link>
      </nav>
    </article>
  );
}
