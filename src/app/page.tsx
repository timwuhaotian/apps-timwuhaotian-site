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
            <p className="eyebrow">Quiet product directory</p>
            <h1 id="hero-title">
              A calm hub for apps, support links, and App Store policy pages.
            </h1>
            <p className="hero-lede">
              Apps by Tim Wu Haotian is a public directory for stable intro,
              privacy, terms, and support pages. It is built to be clear for
              App Store review and useful for people looking for product facts.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#apps">
                Browse apps
              </a>
              <a className="button" href="mailto:timmy.wu@hotmail.com">
                Contact support
              </a>
              <a className="button ghost" href="#policies">
                Policy URLs
              </a>
            </div>
          </div>

          <aside aria-label="Seed app preview" className="hero-aside quiet-panel">
            <div className="mini-directory">
              {apps.map((app) => (
                <MiniApp app={app} key={app.slug} />
              ))}
            </div>
            <p className="aside-note">
              <strong>Core experience:</strong> one scannable directory card,
              one stable route set, and policy pages generated from{" "}
              <code>src/content/apps.ts</code>.
            </p>
          </aside>
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
                <h2 id="apps-title">Apps by Tim Wu Haotian</h2>
                <p className="section-summary">
                  A public directory for app introductions, support links,
                  privacy policies, and terms.
                </p>
              </div>
              <div className="directory-controls">
                <span className="pill ios">iOS-first</span>
                <span className="pill">{apps.length} apps</span>
                <span className="pill">Indexed pages</span>
              </div>
            </div>

            <div className="app-list" id="policies">
              {apps.map((app) => (
                <AppRow app={app} key={app.slug} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell">
          <span>Apps Hub · Tim Wu Haotian</span>
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

function MiniApp({ app }: { app: AppContent }) {
  return (
    <article className="mini-app" style={accentStyle(app)}>
      <Image
        alt={`${app.name} icon`}
        className="app-icon"
        height={84}
        src={app.icon}
        width={84}
      />
      <span>
        <h3>{app.name}</h3>
        <p>Intro · Privacy · Terms</p>
      </span>
      <span aria-hidden="true" className="status-dot" />
    </article>
  );
}

function AppRow({ app }: { app: AppContent }) {
  const routes = getAppRoutes(app);

  return (
    <article className="directory-row" style={accentStyle(app)}>
      <Image
        alt={`${app.name} icon`}
        className="app-icon"
        height={112}
        src={app.icon}
        width={112}
      />

      <div>
        <h2>{app.name}</h2>
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
