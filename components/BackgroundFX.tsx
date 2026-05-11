"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Animated background — three layered effects on dark pages:
 * 1. Slowly-shifting gold gradient mesh (CSS animation)
 * 2. Mouse-tracking radial glow (transform-only, cheap)
 * 3. Floating gold particles canvas
 *
 * SKIPPED on the Home page (/) — Home has its own white theme with
 * the tattoo machine animation, no dark background effects needed.
 */
export default function BackgroundFX() {
  const pathname = usePathname();
  // Skip rendering the dark animated background on light-themed routes.
  const isHome = pathname === "/" || pathname === "/about";

  const [mouse, setMouse] = useState<{ x: number; y: number }>({
    x: 0.5,
    y: 0.5,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isHome) return;
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isHome]);

  useEffect(() => {
    if (isHome) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: {
      x: number;
      y: number;
      r: number;
      vy: number;
      vx: number;
      a: number;
    }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        22,
        Math.max(12, Math.floor((window.innerWidth * window.innerHeight) / 70000))
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: 0.4 + Math.random() * 1.6,
        vy: -(0.05 + Math.random() * 0.18),
        vx: (Math.random() - 0.5) * 0.04,
        a: 0.15 + Math.random() * 0.35,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -10) {
          p.y = window.innerHeight + 10;
          p.x = Math.random() * window.innerWidth;
        }
        if (p.x < -10) p.x = window.innerWidth + 10;
        if (p.x > window.innerWidth + 10) p.x = -10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(212, 175, 55, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [isHome]);

  if (isHome) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 animate-mesh-shift"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 20% 25%, rgba(212, 175, 55, 0.10) 0%, transparent 60%), radial-gradient(ellipse 45% 35% at 80% 75%, rgba(232, 201, 122, 0.08) 0%, transparent 65%), radial-gradient(ellipse 35% 30% at 50% 50%, rgba(168, 139, 44, 0.06) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="absolute inset-0 transition-transform duration-[800ms] ease-out"
        style={{
          background: `radial-gradient(circle 700px at ${mouse.x * 100}% ${
            mouse.y * 100
          }%, rgba(212, 175, 55, 0.10) 0%, transparent 45%)`,
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="grain" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  );
}
