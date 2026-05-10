import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
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
              <a className="button ghost app-tabs__cta" href={app.appStoreUrl}>
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
