import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  SiteFooter,
  SiteHeader,
  supportMailto,
} from "@/components/site-chrome";
import { AppContent, apps, getAppRoutes } from "@/content/apps";
import { buildHomeJsonLd, serializeJsonLd } from "@/content/seo";

export default function Home() {
  return (
    <div className="hub-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildHomeJsonLd()),
        }}
      />
      <SiteHeader />

      <main className="page-shell main-stack" id="main">
        <section aria-labelledby="hero-title" className="hero">
          <div className="hero-card">
            <div className="hero-copy">
              <div className="hero-label">Indie Apps Directory</div>
              <h1 id="hero-title">Apps by Tim Wu Haotian</h1>
              <p className="hero-lede">
                A curated collection of indie apps — voice notes, dual-camera
                recording, spatial memory, research briefings, and AI support
                widgets. Built with care for iOS and the web.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#apps">
                  Browse apps
                </a>
                <a className="button ghost" href={supportMailto}>
                  Contact support
                </a>
              </div>
            </div>
            <HeroShowcase featuredApps={apps} />
          </div>
        </section>

        <section aria-labelledby="apps-title" className="directory-panel" id="apps">
          <div className="browser-bar">
            <div aria-hidden="true" className="browser-dots">
              <span />
              <span />
              <span />
            </div>
            <div className="browser-path">/ · Apps directory</div>
          </div>

          <div className="directory-body">
            <div className="directory-top">
              <div>
                <h2 id="apps-title">Apps directory</h2>
                <p className="section-summary">
                  Public pages for app introductions, privacy policies, and
                  terms of use. Each app includes indexed support links for
                  review and user reference.
                </p>
              </div>
              <div className="directory-controls">
                <span className="pill ios">iOS-first</span>
                <span className="pill">{apps.length} apps</span>
                <span className="pill">Indexed</span>
              </div>
            </div>

            <div className="app-list" id="policies">
              {apps.map((app, i) => (
                <AppRow app={app} key={app.slug} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function HeroShowcase({ featuredApps }: { featuredApps: AppContent[] }) {
  return (
    <aside aria-label="Featured app shortcuts" className="hero-showcase">
      <div className="hero-showcase-top">
        <span>
          {featuredApps.length} apps · {featuredApps.length * 3} public pages
        </span>
        <span>Review-ready</span>
      </div>

      <div className="hero-icon-wall">
        {featuredApps.map((app, index) => {
          const routes = getAppRoutes(app);

          return (
            <Link
              className="hero-visual-link"
              href={routes.intro}
              key={app.slug}
              style={accentStyle(app)}
            >
              <Image
                alt=""
                className="hero-visual-icon"
                height={96}
                priority={index < 3}
                sizes="(max-width: 680px) 64px, 86px"
                src={app.icon}
                width={96}
              />
              <span className="hero-visual-copy">
                <strong>{app.name}</strong>
                <span>{statusLabel(app.status)}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

function AppRow({ app, index }: { app: AppContent; index: number }) {
  const routes = getAppRoutes(app);

  return (
    <article
      className="directory-row"
      style={{
        ...accentStyle(app),
        animationDelay: `${index * 80}ms`,
      }}
    >
      <Link
        aria-hidden="true"
        className="app-icon-link"
        href={routes.intro}
        tabIndex={-1}
      >
        <Image
          alt=""
          className="app-icon"
          height={112}
          src={app.icon}
          width={112}
        />
      </Link>

      <div className="app-info">
        <h3>
          <Link href={routes.intro} className="app-name-link">{app.name}</Link>
        </h3>
        <p>{app.summary}</p>
        <div className="row-meta">
          {app.platforms.map((platform) => (
            <span
              className={`pill ${platform === "iOS" ? "ios" : ""}`}
              key={platform}
            >
              {platform}
            </span>
          ))}
          <StatusBadge status={app.status} />
        </div>
      </div>

      <nav aria-label={`${app.name} links`} className="row-actions">
        {app.appStoreUrl ? (
          <ExternalLink className="link-chip" href={app.appStoreUrl}>
            App Store
          </ExternalLink>
        ) : null}
        {app.websiteUrl ? (
          <ExternalLink className="link-chip" href={app.websiteUrl}>
            Website
          </ExternalLink>
        ) : null}
        <Link className="link-chip" href={routes.intro}>
          Intro
        </Link>
        <Link className="link-chip" href={routes.privacy}>
          Privacy
        </Link>
        <Link className="link-chip" href={routes.terms}>
          Terms
        </Link>
      </nav>
    </article>
  );
}

function StatusBadge({ status }: { status: AppContent["status"] }) {
  const tone = status === "live" ? "live" : status === "beta" ? "beta" : "draft";

  return (
    <span className={`badge ${tone}`}>
      <span className="dot" />
      {statusLabel(status)}
    </span>
  );
}

function statusLabel(status: AppContent["status"]) {
  return status === "live"
    ? "Public"
    : status === "beta"
      ? "Beta"
      : "In development";
}

function accentStyle(app: AppContent): CSSProperties {
  return {
    "--app-accent": app.accentColor,
  } as CSSProperties;
}
