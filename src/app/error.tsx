"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import {
  AmbientBackground,
  GridOverlay,
} from "@/components/site-chrome";
import { CustomCursor } from "@/components/smooth-scroll";

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
    <MotionConfig reducedMotion="user">
      <CustomCursor />
      <AmbientBackground />
      <GridOverlay />
      <main className="page-shell" id="main" style={{ paddingTop: 120, paddingBottom: 80 }}>
        <motion.section
          aria-labelledby="error-title"
          className="status-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="hero-badge" style={{ marginBottom: 20 }}>
            <span className="hero-badge-dot" />
            Something went wrong
          </div>
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
        </motion.section>
      </main>
    </MotionConfig>
  );
}
