"use client";

import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ExternalLink,
  SiteFooter,
  SiteHeader,
  AmbientBackground,
  GridOverlay,
} from "@/components/site-chrome";
import {
  SmoothScrollProvider,
  CustomCursor,
  ScrollProgress,
  AmbientDrift,
} from "@/components/smooth-scroll";
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
  const TitleTag = currentPage === "intro" ? "h1" : "p";

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <ScrollProgress />
      <AmbientDrift />
      <AmbientBackground />
      <GridOverlay />

      <div className="hub-page" style={accentStyle(app)}>
        <SiteHeader />

        <main className="page-shell main-stack" id="main">
          <motion.header
            className="app-detail-hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          >
            <nav aria-label="Breadcrumb" className="breadcrumb">
              <span>
                <Link href="/">Apps</Link>
              </span>
              <span aria-current="page">{app.name}</span>
            </nav>

            <div className="app-detail-title">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 1, 0.5, 1],
                  delay: 0.1,
                }}
              >
                <Image
                  alt={`${app.name} app icon`}
                  className="app-icon"
                  height={148}
                  priority
                  src={app.icon}
                  width={148}
                />
              </motion.div>
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
          </motion.header>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </main>

        <SiteFooter />
      </div>
    </SmoothScrollProvider>
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
      <span aria-hidden="true" className="dot" />
      {label}
    </span>
  );
}

function accentStyle(app: AppContent): CSSProperties {
  return {
    "--app-accent": app.accentColor,
    "--app-accent-glow": `${app.accentColor}15`,
  } as CSSProperties;
}
