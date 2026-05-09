"use client";

import { motion } from "framer-motion";

/**
 * Template wraps every route. Re-mounts on each navigation, which lets us
 * trigger a smooth fade + lift transition between pages.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
