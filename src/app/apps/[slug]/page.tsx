import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AppShell, StatusBadge } from "./AppShell";
import { apps, getAppBySlug } from "@/content/apps";
import {
  buildAppJsonLd,
  getAppFaqs,
  getAppMetadata,
  serializeJsonLd,
} from "@/content/seo";

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

  return getAppMetadata(app, "intro");
}

export default async function AppPage({ params }: PageProps) {
  const app = getAppBySlug((await params).slug);

  if (!app) {
    notFound();
  }

  const faqs = getAppFaqs(app);

  return (
    <AppShell app={app} currentPage="intro">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildAppJsonLd(app.slug)),
        }}
      />
      <section className="app-detail-grid">
        <div className="app-detail-copy">
          <p className="hero-lede">{app.summary}</p>

          <div className="feature-list">
            {app.features.map((feature) => (
              <article className="feature-item" key={feature}>
                <span className="feature-check">✓</span>
                <p>{feature}</p>
              </article>
            ))}
          </div>

          <section className="app-faq" aria-labelledby={`${app.slug}-faq-title`}>
            <h2 id={`${app.slug}-faq-title`}>Key questions</h2>
            {faqs.map((faq) => (
              <article key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </section>
        </div>

        <aside className="app-detail-rail">
          <MediaStrip app={app} />

          <section className="metadata-card">
            <h2>App metadata</h2>
            <dl>
              <Info label="Status" value={<StatusBadge status={app.status} />} />
              <Info label="Platforms" value={app.platforms.join(", ")} />
              {app.bundleId ? (
                <Info label="Bundle ID" value={app.bundleId} />
              ) : null}
              {app.appStoreUrl ? (
                <Info
                  label="App Store"
                  value={<a href={app.appStoreUrl}>Open listing</a>}
                />
              ) : null}
              {app.websiteUrl ? (
                <Info
                  label="Website"
                  value={<a href={app.websiteUrl}>{app.websiteUrl}</a>}
                />
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
          loading="eager"
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
