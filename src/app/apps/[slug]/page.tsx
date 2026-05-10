/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "./AppShell";
import { apps, getAppBySlug } from "@/content/apps";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const app = getAppBySlug((await params).slug);

  if (!app) {
    return {};
  }

  return {
    title: `${app.name} | Apps by Tim Wu Haotian`,
    description: app.summary,
    openGraph: {
      title: app.name,
      description: app.summary,
      images: [app.icon],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function AppPage({ params }: PageProps) {
  const app = getAppBySlug((await params).slug);

  if (!app) {
    notFound();
  }

  return (
    <AppShell app={app}>
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-xl leading-8 text-zinc-700">{app.summary}</p>

          <div className="grid gap-3 sm:grid-cols-3">
            {app.features.map((feature) => (
              <div className="rounded-lg border bg-white p-4" key={feature}>
                <p className="text-sm leading-6 text-zinc-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border bg-white p-5">
          <dl className="space-y-4 text-sm">
            <Info label="Status" value={app.status} />
            <Info label="Platforms" value={app.platforms.join(", ")} />
            {app.bundleId ? <Info label="Bundle ID" value={app.bundleId} /> : null}
            <Info label="Support" value={app.supportEmail} />
          </dl>
        </aside>
      </section>

      <MediaStrip app={app} />
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-medium text-zinc-500">{label}</dt>
      <dd className="mt-1 text-zinc-900">{value}</dd>
    </div>
  );
}

function MediaStrip({ app }: { app: (typeof apps)[number] }) {
  const media = app.screenshots.length > 0 ? app.screenshots : [app.icon];

  return (
    <section className="grid gap-4">
      <h2 className="text-lg font-semibold">Media</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {media.map((src) => (
          <div
            className="relative aspect-[9/19.5] h-96 shrink-0 overflow-hidden rounded-lg border bg-zinc-100"
            key={src}
          >
            <img
              alt={`${app.name} product media`}
              className={
                app.screenshots.length > 0
                  ? "h-full w-full object-cover"
                  : "h-full w-full object-contain p-12"
              }
              src={src}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
