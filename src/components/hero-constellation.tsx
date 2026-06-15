"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { apps } from "@/content/apps";

const orbits = [
  { x: 280, y: -60, z: 120, scale: 0.9, delay: 0, duration: 14 },
  { x: 180, y: 80, z: 80, scale: 0.78, delay: 0.5, duration: 18 },
  { x: 360, y: 40, z: 160, scale: 0.66, delay: 1.2, duration: 16 },
  { x: 120, y: -140, z: 40, scale: 0.58, delay: 0.8, duration: 20 },
  { x: 320, y: 160, z: 200, scale: 0.5, delay: 1.8, duration: 22 },
  { x: 200, y: 180, z: 100, scale: 0.44, delay: 2.4, duration: 19 },
  { x: 400, y: -20, z: 60, scale: 0.48, delay: 0.3, duration: 17 },
  { x: 260, y: -180, z: 140, scale: 0.4, delay: 3.0, duration: 21 },
];

export function HeroConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 30, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 25 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) / cx);
      mouseY.set((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      {apps.map((app, i) => {
        const orbit = orbits[i % orbits.length];
        return (
          <ConstellationIcon
            key={app.slug}
            app={app}
            orbit={orbit}
            springX={springX}
            springY={springY}
          />
        );
      })}
    </div>
  );
}

function ConstellationIcon({
  app,
  orbit,
  springX,
  springY,
}: {
  app: (typeof apps)[number];
  orbit: (typeof orbits)[number];
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}) {
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  const motionZ = useMotionValue(0);
  const motionScale = useMotionValue(1);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const mx = springX.get();
      const my = springY.get();
      motionX.set(orbit.x + mx * orbit.z * 0.3);
      motionY.set(orbit.y + my * orbit.z * 0.3);
      motionZ.set(orbit.z);
      motionScale.set(orbit.scale);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [motionX, motionY, motionZ, motionScale, orbit, springX, springY]);

  const x = useSpring(motionX, { stiffness: 40, damping: 30 });
  const y = useSpring(motionY, { stiffness: 40, damping: 30 });
  const z = useSpring(motionZ, { stiffness: 40, damping: 30 });
  const scale = useSpring(motionScale, { stiffness: 40, damping: 30 });

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "50%",
        left: "55%",
        x,
        y,
        z,
        scale,
        translateX: "-50%",
        translateY: "-50%",
        perspective: 800,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 0.6, scale: orbit.scale }}
      transition={{
        duration: 0.8,
        delay: orbit.delay + 1.0,
        ease: [0.25, 1, 0.5, 1],
      }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotateY: [0, 5, 0],
          rotateX: [0, -2, 0],
        }}
        transition={{
          duration: orbit.duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="constellation-icon"
          style={{
            width: 48 * orbit.scale,
            height: 48 * orbit.scale,
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: `0 0 20px ${app.accentColor}25, 0 6px 20px rgba(0,0,0,0.45)`,
            transition: "box-shadow 300ms, opacity 300ms",
            opacity: 0.85,
          }}
        >
          <Image
            alt=""
            src={app.icon}
            width={104}
            height={104}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
