import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppContent, apps, getAppRoutes } from "@/content/apps";

export default function Home() {
  return (
    <div className="hub-page">
      <SiteHeader />

      <main className="page-shell main-stack" id="top">
        <section aria-labelledby="hero-title" className="hero">
          <div className="hero-card">
            <div className="hero-ornament" aria-hidden="true">
              <div className="hero-orb hero-orb-1" />
              <div className="hero-orb hero-orb-2" />
              <div className="hero-orb hero-orb-3" />
            </div>
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
              <a className="button ghost" href="mailto:timmy.wu@hotmail.com">
                Contact support
              </a>
            </div>
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

      <footer className="site-footer">
        <div className="page-shell">
          <div className="footer-brand">
            <span className="footer-mark">A</span>
            <span>Apps Hub · Tim Wu Haotian</span>
          </div>
          <span>Stable public pages for app review, users, and support.</span>
        </div>
      </footer>
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="page-shell site-header__inner">
        <a aria-label="Apps Hub home" className="brand" href="#top">
          <span className="brand-mark">A</span>
          <span className="brand-copy">
            <span className="brand-title">Apps Hub</span>
            <span className="brand-subtitle">Tim Wu Haotian</span>
          </span>
        </a>
        <nav aria-label="App hub sections" className="site-nav">
          <a href="#apps">Apps</a>
          <a href="#policies">Policies</a>
          <a href="mailto:timmy.wu@hotmail.com">Support</a>
        </nav>
      </div>
    </header>
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
      <Link href={routes.intro} aria-label={app.name} className="app-icon-link">
        <Image
          alt={`${app.name} icon`}
          className="app-icon"
          height={112}
          src={app.icon}
          width={112}
        />
      </Link>

      <div className="app-info">
        <h2>
          <Link href={routes.intro} className="app-name-link">{app.name}</Link>
        </h2>
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
          <a className="link-chip" href={app.appStoreUrl}>
            App Store
          </a>
        ) : null}
        {app.websiteUrl ? (
          <a className="link-chip" href={app.websiteUrl}>
            Website
          </a>
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
  const label =
    status === "live" ? "Public" : status === "beta" ? "Beta" : "Draft";
  const tone = status === "live" ? "live" : status === "beta" ? "beta" : "draft";

  return (
    <span className={`badge ${tone}`}>
      <span className="dot" />
      {label}
    </span>
  );
}

function accentStyle(app: AppContent): CSSProperties {
  return {
    "--app-accent": app.accentColor,
  } as CSSProperties;
}
