'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom magnetic cursor follower.
 * Renders a small dot that follows the mouse with spring physics,
 * and a larger trailing ring for that ultra-modern feel.
 */
export default function Cursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const dotX = useSpring(mouseX, { stiffness: 500, damping: 28 })
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 28 })

  const ringX = useSpring(mouseX, { stiffness: 120, damping: 22 })
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 22 })

  const isVisible = useRef(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible.current) isVisible.current = true
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="fixed top-0 left-0 w-2 h-2 bg-[#0818A8] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block"
      />
      {/* Ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="fixed top-0 left-0 w-8 h-8 border border-[#0818A8]/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      />
    </>
  )
}
