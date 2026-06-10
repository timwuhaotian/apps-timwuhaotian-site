import type { Metadata } from "next";
import Link from "next/link";
import {
  SiteFooter,
  SiteHeader,
  supportMailto,
} from "@/components/site-chrome";
import { apps, getAppRoutes } from "@/content/apps";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="hub-page">
      <SiteHeader />

      <main className="page-shell main-stack" id="main">
        <section aria-labelledby="not-found-title" className="status-card">
          <p className="hero-label">404 · Not found</p>
          <h1 id="not-found-title">This page doesn&rsquo;t exist.</h1>
          <p className="hero-lede">
            The address may have changed, but every public app page is still
            one click away.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/">
              Back to the directory
            </Link>
            <a className="button ghost" href={supportMailto}>
              Contact support
            </a>
          </div>

          <nav aria-label="App pages" className="status-links">
            {apps.map((app) => (
              <Link
                className="link-chip"
                href={getAppRoutes(app).intro}
                key={app.slug}
              >
                {app.name}
              </Link>
            ))}
          </nav>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
