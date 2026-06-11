"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AmbientBackground,
  ExternalLink,
  GridOverlay,
  SiteFooter,
  SiteHeader,
  supportMailto,
} from "@/components/site-chrome";
import { SmoothScrollProvider, CustomCursor } from "@/components/smooth-scroll";
import {
  FadeUp,
  FadeIn,
  ScaleReveal,
  StaggerContainer,
  Parallax,
  MagneticButton,
  TiltCard,
  TextReveal,
} from "@/components/motion";
import { AppContent, apps, getAppRoutes } from "@/content/apps";
import { buildHomeJsonLd, serializeJsonLd } from "@/content/seo";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <AmbientBackground />
      <GridOverlay />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildHomeJsonLd()),
        }}
      />
      <SiteHeader />

      <div className="hub-page">
        {/* ===== HERO ===== */}
        <section className="hero-section" id="main">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                Indie Apps Directory
              </div>
            </motion.div>

            <div className="hero-title-wrap">
              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
              >
                Apps by{" "}
                <span className="accent-word">Tim Wu Haotian</span>
              </motion.h1>
            </div>

            <FadeUp delay={0.7}>
              <p className="hero-lede">
                A curated collection of indie apps — voice notes, dual-camera
                recording, spatial memory, research briefings, and AI support
                widgets. Built with care for iOS and the web.
              </p>
            </FadeUp>

            <FadeUp delay={0.85}>
              <div className="hero-actions">
                <MagneticButton>
                  <a className="button primary" href="#apps">
                    Browse apps
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a className="button ghost" href={supportMailto}>
                    Contact support
                  </a>
                </MagneticButton>
              </div>
            </FadeUp>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <span>Scroll</span>
            <div className="scroll-line" />
          </motion.div>
        </section>

        {/* ===== APPS DIRECTORY ===== */}
        <section className="apps-section" id="apps">
          <FadeIn>
            <div className="apps-section-header">
              <div>
                <h2 className="apps-section-title">Apps directory</h2>
                <p className="apps-section-subtitle">
                  Public pages for app introductions, privacy policies, and
                  terms of use. Each app includes indexed support links.
                </p>
              </div>
              <div className="apps-section-pills">
                <span className="pill ios">iOS-first</span>
                <span className="pill">{apps.length} apps</span>
                <span className="pill">Indexed</span>
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="app-grid" id="policies">
            {apps.map((app, i) => (
              <AppCard app={app} key={app.slug} index={i} />
            ))}
          </StaggerContainer>
        </section>

        <SiteFooter />
      </div>
    </SmoothScrollProvider>
  );
}

function AppCard({ app, index }: { app: AppContent; index: number }) {
  const routes = getAppRoutes(app);

  return (
    <motion.article
      className="app-card"
      style={
        {
          "--app-accent": app.accentColor,
          "--app-accent-glow": `${app.accentColor}15`,
          animationDelay: `${index * 80}ms`,
        } as CSSProperties
      }
      variants={{
        hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
        },
      }}
    >
      <div className="app-icon-wrap">
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
      </div>

      <div className="app-info">
        <h3>
          <Link href={routes.intro} className="app-name-link">
            {app.name}
          </Link>
        </h3>
        <p>{app.summary}</p>
        <div className="row-meta">
          {app.platforms.map((platform) => (
            <span
              className={`pill ${platform === "iOS" || platform === "iPadOS" ? "ios" : ""}`}
              key={platform}
              style={{ minHeight: 24, padding: "2px 10px", fontSize: 11 }}
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
    </motion.article>
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
