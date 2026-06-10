import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { AppContent, getAppRoutes, getPolicyPage } from "@/content/apps";

type AppShellProps = {
  app: AppContent;
  children: ReactNode;
  currentPage?: "intro" | "privacy" | "terms";
};

export function AppShell({
  app,
  children,
  currentPage = "intro",
}: AppShellProps) {
  const routes = getAppRoutes(app);
  // Policy pages carry their own <h1> in PolicyArticle, so the masthead
  // title demotes to keep one h1 per page.
  const TitleTag = currentPage === "intro" ? "h1" : "p";

  return (
    <div className="hub-page" style={accentStyle(app)}>
      <SiteHeader />

      <main className="page-shell main-stack" id="main">
        <header className="app-detail-hero">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <span>
              <Link href="/">Apps</Link>
            </span>
            <span aria-current="page">{app.name}</span>
          </nav>

          <div className="app-detail-title">
            <Image
              alt={`${app.name} app icon`}
              className="app-icon"
              height={148}
              priority
              src={app.icon}
              width={148}
            />
            <div>
              <TitleTag className="app-title">{app.name}</TitleTag>
              <p className="app-tagline">{app.tagline}</p>
            </div>
          </div>

          <nav aria-label={`${app.name} pages`} className="app-tabs">
            <PageLink
              current={currentPage}
              href={routes.intro}
              page="intro"
            >
              Intro
            </PageLink>
            <PageLink
              current={currentPage}
              href={routes.privacy}
              page="privacy"
            >
              Privacy
            </PageLink>
            <PageLink
              current={currentPage}
              href={routes.terms}
              page="terms"
            >
              Terms
            </PageLink>
            {app.appStoreUrl ? (
              <ExternalLink
                className="button ghost app-tabs__cta"
                href={app.appStoreUrl}
              >
                App Store
              </ExternalLink>
            ) : null}
            {app.websiteUrl ? (
              <ExternalLink
                className="button ghost app-tabs__cta"
                href={app.websiteUrl}
              >
                Website
              </ExternalLink>
            ) : null}
          </nav>
        </header>

        {children}
      </main>

      <SiteFooter />
    </div>
  );
}

function PageLink({
  children,
  current,
  href,
  page,
}: {
  children: ReactNode;
  current: NonNullable<AppShellProps["currentPage"]>;
  href: string;
  page: NonNullable<AppShellProps["currentPage"]>;
}) {
  const isCurrent = current === page;

  return (
    <Link
      aria-current={isCurrent ? "page" : undefined}
      className={`button ${isCurrent ? "primary" : ""}`.trim()}
      href={href}
    >
      {children}
    </Link>
  );
}

export function PolicyArticle({
  app,
  policy,
}: {
  app: AppContent;
  policy: ReturnType<typeof getPolicyPage>;
}) {
  return (
    <article className="policy-shell">
      <header className="policy-top">
        <h1>{policy.title}</h1>
        <p className="policy-meta">
          Last updated: {policy.updatedAt} · Legal owner: {app.legalOwner} ·
          Support:{" "}
          <a href={`mailto:${app.supportEmail}`}>{app.supportEmail}</a>
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
    status === "live"
      ? "Public"
      : status === "beta"
        ? "Beta"
        : "In development";
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
