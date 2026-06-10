import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

export const supportMailto = "mailto:gosingk@gmail.com";

const buildYear = new Date().getFullYear();

export function SiteHeader() {
  return (
    <header className="site-header">
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
    </header>
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
