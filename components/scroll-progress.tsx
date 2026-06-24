'use client'

import { useScroll, motion } from 'framer-motion'

/** Thin Hyperblue progress bar pinned to the very top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#0818A8] z-[100] pointer-events-none"
    />
  )
}
