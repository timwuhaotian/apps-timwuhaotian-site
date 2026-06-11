"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  SiteFooter,
  SiteHeader,
  AmbientBackground,
  GridOverlay,
  supportMailto,
} from "@/components/site-chrome";
import { SmoothScrollProvider, CustomCursor } from "@/components/smooth-scroll";
import { FadeUp } from "@/components/motion";
import { apps, getAppRoutes } from "@/content/apps";

export default function NotFound() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <AmbientBackground />
      <GridOverlay />
      <div className="hub-page">
        <SiteHeader />

        <main className="page-shell main-stack" id="main">
          <motion.section
            aria-labelledby="not-found-title"
            className="status-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="hero-badge" style={{ marginBottom: 20 }}>
              <span className="hero-badge-dot" />
              404 · Not found
            </div>
            <h1 id="not-found-title">This page doesn&rsquo;t exist.</h1>
            <p className="hero-lede">
              The address may have changed, but every public app page is still
              one click away.
            </p>
            <FadeUp delay={0.3}>
              <div className="hero-actions">
                <Link className="button primary" href="/">
                  Back to the directory
                </Link>
                <a className="button ghost" href={supportMailto}>
                  Contact support
                </a>
              </div>
            </FadeUp>

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
          </motion.section>
        </main>

        <SiteFooter />
      </div>
    </SmoothScrollProvider>
  );
}
