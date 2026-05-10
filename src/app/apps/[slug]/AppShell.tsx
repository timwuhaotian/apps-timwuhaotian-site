import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppContent, getAppRoutes, getPolicyPage } from "@/content/apps";

type AppShellProps = {
  app: AppContent;
  children: ReactNode;
};

export function AppShell({ app, children }: AppShellProps) {
  const routes = getAppRoutes(app);

  return (
    <main className="hub-page" style={accentStyle(app)}>
      <div className="page-shell main-stack">
        <header className="intro-main">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">Apps</Link>
            <span>{app.name}</span>
          </nav>

          <div className="intro-heading">
            <Image
              alt={`${app.name} icon`}
              className="app-icon"
              height={148}
              priority
              src={app.icon}
              width={148}
            />
            <div>
              <h1>{app.name}</h1>
              <p>{app.tagline}</p>
            </div>
          </div>

          <nav aria-label={`${app.name} pages`} className="hero-actions">
            <Link className="button primary" href={routes.intro}>
              Intro
            </Link>
            <Link className="button" href={routes.privacy}>
              Privacy
            </Link>
            <Link className="button" href={routes.terms}>
              Terms
            </Link>
            {app.appStoreUrl ? (
              <a className="button ghost" href={app.appStoreUrl}>
                App Store
              </a>
            ) : null}
          </nav>
        </header>

        {children}
      </div>
    </main>
  );
}

export function PolicyArticle({
  app,
  kind,
  policy,
}: {
  app: AppContent;
  kind: "privacy" | "terms";
  policy: ReturnType<typeof getPolicyPage>;
}) {
  return (
    <article className="policy-shell">
      <header className="policy-top">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Apps</Link>
          <Link href={getAppRoutes(app).intro}>{app.name}</Link>
          <span>{kind === "privacy" ? "Privacy" : "Terms"}</span>
        </nav>
        <h1>{policy.title}</h1>
        <p className="policy-meta">
          Last updated: {policy.updatedAt} · Legal owner: {app.legalOwner} ·
          Support: {app.supportEmail}
        </p>
      </header>

      <div className="policy-content">
        {policy.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}

export function StatusBadge({ status }: { status: AppContent["status"] }) {
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

export function accentStyle(app: AppContent): CSSProperties {
  return {
    "--app-accent": app.accentColor,
  } as CSSProperties;
}
