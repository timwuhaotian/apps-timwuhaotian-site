import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AppShell, StatusBadge } from "./AppShell";
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
      <section className="intro-preview">
        <div className="intro-main">
          <p className="hero-lede">{app.summary}</p>

          <div className="feature-list">
            {app.features.map((feature) => (
              <article className="feature-item" key={feature}>
                <span className="feature-check">✓</span>
                <div>
                  <h2>{featureTitle(feature)}</h2>
                  <p>{feature}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="screenshot-stack">
          <MediaStrip app={app} />

          <section className="side-card">
            <h2>App metadata</h2>
            <dl>
              <Info label="Status" value={<StatusBadge status={app.status} />} />
              <Info label="Platforms" value={app.platforms.join(", ")} />
              {app.bundleId ? (
                <Info label="Bundle ID" value={app.bundleId} />
              ) : null}
              <Info label="Support" value={app.supportEmail} />
              <Info label="Legal owner" value={app.legalOwner} />
            </dl>
          </section>
        </aside>
      </section>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function MediaStrip({ app }: { app: (typeof apps)[number] }) {
  const [src] = app.screenshots;

  if (src) {
    return (
      <div className="phone-frame">
        <Image
          alt={`${app.name} product screenshot`}
          height={1170}
          src={src}
          width={540}
        />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="phone-frame">
      <div className="phone-notch" />
      <div className="phone-block hero-block" />
      <div className="phone-block small" />
      <div className="phone-block" />
      <div className="phone-block small" />
    </div>
  );
}

function featureTitle(feature: string) {
  const [title] = feature.split(".");

  return title;
}
