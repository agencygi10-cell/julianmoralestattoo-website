"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Stylized coil tattoo machine SVG with scroll-driven disassembly.
 *
 * Each part is its own <motion.g> with translation tied to scroll progress.
 * As the user scrolls through the parent container, every piece drifts away
 * from center. Scrolling back up reassembles the machine (transforms are
 * fully reversible).
 *
 * Pieces (top → bottom in assembled state):
 *   1. cord        — power cable curling into top of machine
 *   2. capacitor   — small cylinder above coils
 *   3. armature    — gold bar across the top of the coils
 *   4. leftCoil    — left vertical coil
 *   5. rightCoil   — right vertical coil
 *   6. frame       — Y-shape steel body holding everything together
 *   7. tube        — narrow pipe below frame
 *   8. grip        — knurled handle wrapping the tube
 *   9. tip         — gold tip + needle at the bottom
 */
export default function TattooMachine({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  // Per-part transforms — each piece drifts to its own destination as
  // progress goes 0 → 1.
  const cordX = useTransform(progress, [0, 1], [0, -160]);
  const cordY = useTransform(progress, [0, 1], [0, -130]);
  const cordOpacity = useTransform(progress, [0.55, 0.95], [1, 0]);

  const capX = useTransform(progress, [0, 1], [0, 140]);
  const capY = useTransform(progress, [0, 1], [0, -190]);

  const armX = useTransform(progress, [0, 1], [0, -30]);
  const armY = useTransform(progress, [0, 1], [0, -230]);

  const leftCoilX = useTransform(progress, [0, 1], [0, -200]);
  const leftCoilY = useTransform(progress, [0, 1], [0, -30]);

  const rightCoilX = useTransform(progress, [0, 1], [0, 200]);
  const rightCoilY = useTransform(progress, [0, 1], [0, -30]);

  const frameY = useTransform(progress, [0, 1], [0, 60]);

  const tubeX = useTransform(progress, [0, 1], [0, -180]);
  const tubeY = useTransform(progress, [0, 1], [0, 70]);

  const gripX = useTransform(progress, [0, 1], [0, 180]);
  const gripY = useTransform(progress, [0, 1], [0, 90]);

  const tipY = useTransform(progress, [0, 1], [0, 250]);

  return (
    <svg
      viewBox="0 0 400 750"
      xmlns="http://www.w3.org/2000/svg"
      className="block w-full h-auto"
      role="img"
      aria-label="Coil tattoo machine — disassembling on scroll"
    >
      <defs>
        <linearGradient id="goldFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C97A" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#A88B2C" />
        </linearGradient>
        <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A88B2C" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>

      {/* ── 1. CORD ─────────────────────────────────────────────── */}
      <motion.g style={{ x: cordX, y: cordY, opacity: cordOpacity }}>
        <path
          d="M30 30 C 80 35, 110 60, 140 75 C 165 88, 180 92, 195 95"
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="30" cy="30" r="4" fill="#0a0a0a" />
        <path
          d="M40 32 Q 55 40 50 50"
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </motion.g>

      {/* ── 2. CAPACITOR (top cylinder) ─────────────────────────── */}
      <motion.g style={{ x: capX, y: capY }}>
        <rect
          x="168"
          y="62"
          width="64"
          height="22"
          rx="4"
          fill="#ffffff"
          stroke="#0a0a0a"
          strokeWidth="2"
        />
        <line x1="178" y1="73" x2="222" y2="73" stroke="#0a0a0a" strokeWidth="1" />
        <line x1="174" y1="68" x2="174" y2="78" stroke="#0a0a0a" strokeWidth="1" />
        <line x1="226" y1="68" x2="226" y2="78" stroke="#0a0a0a" strokeWidth="1" />
      </motion.g>

      {/* ── 3. ARMATURE BAR ─────────────────────────────────────── */}
      <motion.g style={{ x: armX, y: armY }}>
        <rect
          x="118"
          y="95"
          width="164"
          height="16"
          rx="3"
          fill="url(#goldFill)"
          stroke="#0a0a0a"
          strokeWidth="1.5"
        />
        <circle cx="135" cy="103" r="2" fill="#0a0a0a" />
        <circle cx="265" cy="103" r="2" fill="#0a0a0a" />
      </motion.g>

      {/* ── 4. LEFT COIL ────────────────────────────────────────── */}
      <motion.g style={{ x: leftCoilX, y: leftCoilY }}>
        <rect
          x="123"
          y="120"
          width="62"
          height="135"
          rx="6"
          fill="#ffffff"
          stroke="#0a0a0a"
          strokeWidth="2.5"
        />
        {/* Wire wrapping lines */}
        <g stroke="#0a0a0a" strokeWidth="1">
          {[133, 145, 157, 169, 181, 193, 205, 217, 229, 241, 253].map((y) => (
            <line key={y} x1="126" y1={y} x2="182" y2={y} />
          ))}
        </g>
        {/* Top and bottom caps */}
        <ellipse cx="154" cy="120" rx="31" ry="4" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2" />
        <ellipse cx="154" cy="255" rx="31" ry="4" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2" />
      </motion.g>

      {/* ── 5. RIGHT COIL ───────────────────────────────────────── */}
      <motion.g style={{ x: rightCoilX, y: rightCoilY }}>
        <rect
          x="215"
          y="120"
          width="62"
          height="135"
          rx="6"
          fill="#ffffff"
          stroke="#0a0a0a"
          strokeWidth="2.5"
        />
        <g stroke="#0a0a0a" strokeWidth="1">
          {[133, 145, 157, 169, 181, 193, 205, 217, 229, 241, 253].map((y) => (
            <line key={y} x1="218" y1={y} x2="274" y2={y} />
          ))}
        </g>
        <ellipse cx="246" cy="120" rx="31" ry="4" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2" />
        <ellipse cx="246" cy="255" rx="31" ry="4" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2" />
      </motion.g>

      {/* ── 6. FRAME (Y-shape steel body) ───────────────────────── */}
      <motion.g style={{ y: frameY }}>
        <path
          d="M 120 260 L 120 330 L 200 380 L 280 330 L 280 260"
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <line
          x1="200"
          y1="380"
          x2="200"
          y2="420"
          stroke="#0a0a0a"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Connection screws */}
        <circle cx="120" cy="260" r="4" fill="#0a0a0a" />
        <circle cx="280" cy="260" r="4" fill="#0a0a0a" />
        <circle cx="200" cy="380" r="3" fill="#0a0a0a" />
        {/* Cross detail line on bottom */}
        <line
          x1="180"
          y1="395"
          x2="220"
          y2="395"
          stroke="#0a0a0a"
          strokeWidth="1.5"
        />
      </motion.g>

      {/* ── 7. TUBE ─────────────────────────────────────────────── */}
      <motion.g style={{ x: tubeX, y: tubeY }}>
        <rect
          x="190"
          y="420"
          width="20"
          height="70"
          fill="#ffffff"
          stroke="#0a0a0a"
          strokeWidth="2"
        />
        <line x1="200" y1="420" x2="200" y2="490" stroke="#0a0a0a" strokeWidth="0.7" />
      </motion.g>

      {/* ── 8. GRIP (knurled handle) ────────────────────────────── */}
      <motion.g style={{ x: gripX, y: gripY }}>
        <rect
          x="176"
          y="480"
          width="48"
          height="130"
          rx="8"
          fill="#ffffff"
          stroke="#0a0a0a"
          strokeWidth="2.5"
        />
        {/* Knurling pattern */}
        <g stroke="#0a0a0a" strokeWidth="1">
          {[495, 507, 519, 531, 543, 555, 567, 579, 591].map((y) => (
            <line key={y} x1="181" y1={y} x2="219" y2={y} />
          ))}
        </g>
        {/* Top and bottom rims */}
        <ellipse cx="200" cy="480" rx="24" ry="4" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2" />
        <ellipse cx="200" cy="610" rx="24" ry="4" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2" />
      </motion.g>

      {/* ── 9. TIP + NEEDLE ─────────────────────────────────────── */}
      <motion.g style={{ y: tipY }}>
        <path
          d="M 178 610 L 222 610 L 212 640 L 188 640 Z"
          fill="url(#goldFill)"
          stroke="#0a0a0a"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <line
          x1="200"
          y1="640"
          x2="200"
          y2="700"
          stroke="#0a0a0a"
          strokeWidth="1.5"
        />
        <circle cx="200" cy="702" r="2" fill="#0a0a0a" />
      </motion.g>
    </svg>
  );
}

/**
 * Convenience hook — pairs a ref with a scroll progress MotionValue
 * mapped to the ref's "start start" → "end end" range.
 */
export function useMachineScroll(ref: React.RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return scrollYProgress;
}
