/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { AppContent, getAppRoutes } from "@/content/apps";

type AppShellProps = {
  app: AppContent;
  children: React.ReactNode;
};

export function AppShell({ app, children }: AppShellProps) {
  const routes = getAppRoutes(app);

  return (
    <main className="min-h-screen bg-stone-50 text-zinc-950">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-5 py-8 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-6 border-b border-zinc-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link className="text-sm font-medium text-zinc-500" href="/">
              Apps
            </Link>
            <div className="mt-4 flex items-center gap-4">
              <img
                alt={`${app.name} icon`}
                className="h-16 w-16 rounded-2xl"
                src={app.icon}
              />
              <div>
                <h1 className="text-4xl font-semibold tracking-normal">
                  {app.name}
                </h1>
                <p className="mt-2 max-w-2xl text-base leading-7 text-zinc-600">
                  {app.tagline}
                </p>
              </div>
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
        </header>

        {children}
      </div>
    </main>
  );
}
