"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Lenis from "@studio-freight/lenis";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

export function useScrollDirection() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        if (y < 100) {
          setHidden(false);
        } else if (delta > 8) {
          setHidden(true);
        } else if (delta < -8) {
          setHidden(false);
        }
        lastY.current = y;
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}

export function useMagnetic() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  }, []);

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}

/* ===== Scroll progress bar ===== */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}

/* ===== Ambient BG mouse drift ===== */
export function AmbientDrift() {
  useEffect(() => {
    const bg = document.querySelector(".ambient-bg") as HTMLElement | null;
    if (!bg) return;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      bg.style.setProperty("--orb-x", dx.toFixed(3));
      bg.style.setProperty("--orb-y", dy.toFixed(3));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Only on desktop
    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!hasHover.matches) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onEnterInteractive = () => setHovering(true);
    const onLeaveInteractive = () => setHovering(false);

    window.addEventListener("mousemove", onMove);

    // Observe interactive elements
    const observer = new MutationObserver(() => {
      document
        .querySelectorAll("a, button, [role='button'], .app-card, .button, .link-chip")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnterInteractive);
          el.addEventListener("mouseleave", onLeaveInteractive);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial bind
    document
      .querySelectorAll("a, button, [role='button'], .app-card, .button, .link-chip")
      .forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });

    // Lerp loop
    let rafId: number;
    function animate() {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${hovering ? "hovering" : ""}`}
        style={{ position: "fixed", top: 0, left: 0 }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${hovering ? "hovering" : ""}`}
        style={{ position: "fixed", top: 0, left: 0 }}
      />
    </>
  );
}
