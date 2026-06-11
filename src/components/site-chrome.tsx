"use client";

import { useState, useEffect, type AnchorHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollDirection } from "@/components/smooth-scroll";

export const supportMailto = "mailto:gosingk@gmail.com";

const buildYear = new Date().getFullYear();

export function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-orb ambient-orb--1" />
      <div className="ambient-orb ambient-orb--2" />
      <div className="ambient-orb ambient-orb--3" />
    </div>
  );
}

export function GridOverlay() {
  return <div className="grid-overlay" aria-hidden="true" />;
}

export function SiteHeader() {
  const hidden = useScrollDirection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`site-header ${hidden ? "hidden" : ""} ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
    >
      <div className="page-shell site-header__inner">
        <Link aria-label="Apps Hub home" className="brand" href="/">
          <span aria-hidden="true" className="brand-mark">
            A
          </span>
          <span className="brand-copy">
            <span className="brand-title">Apps Hub</span>
            <span className="brand-subtitle">Tim Wu Haotian</span>
          </span>
        </Link>
        <nav aria-label="App hub sections" className="site-nav">
          <Link href="/#apps">Apps</Link>
          <Link href="/#policies">Policies</Link>
          <a href={supportMailto}>Support</a>
        </nav>
      </div>
    </motion.header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-brand">
          <span aria-hidden="true" className="footer-mark">
            A
          </span>
          <span>Apps Hub · Tim Wu Haotian</span>
        </div>
        <nav aria-label="Footer" className="footer-nav">
          <Link href="/#apps">Apps</Link>
          <Link href="/#policies">Policies</Link>
          <a href={supportMailto}>Support</a>
        </nav>
        <span className="footer-note">
          © {buildYear} WU HAOTIAN · Stable public pages for app review, users,
          and support.
        </span>
      </div>
    </footer>
  );
}

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function ExternalLink({ children, ...props }: ExternalLinkProps) {
  return (
    <a {...props} rel="noopener noreferrer" target="_blank">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
