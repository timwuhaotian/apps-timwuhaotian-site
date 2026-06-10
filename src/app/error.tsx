"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="page-shell main-stack" id="main">
      <section aria-labelledby="error-title" className="status-card">
        <p className="hero-label">Something went wrong</p>
        <h1 id="error-title">This page hit an unexpected error.</h1>
        <p className="hero-lede">
          Try again — if the problem keeps happening, email{" "}
          <a className="status-inline-link" href="mailto:gosingk@gmail.com">
            gosingk@gmail.com
          </a>{" "}
          and we&rsquo;ll take a look.
        </p>
        {error.digest ? (
          <p className="status-digest">Error reference: {error.digest}</p>
        ) : null}
        <div className="hero-actions">
          <button
            className="button primary"
            onClick={() => unstable_retry()}
            type="button"
          >
            Try again
          </button>
          <Link className="button ghost" href="/">
            Back to the directory
          </Link>
        </div>
      </section>
    </main>
  );
}
