'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface SplashScreenProps {
  onComplete: () => void
}

const BRAND_NAME = 'CloudPxl'

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [phase, setPhase] = useState<'typing' | 'hold' | 'exit'>('typing')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Phase 1: typing effect — each letter every 90ms
    let charIndex = 0
    const typingInterval = setInterval(() => {
      charIndex++
      setTypedText(BRAND_NAME.slice(0, charIndex))
      if (charIndex >= BRAND_NAME.length) {
        clearInterval(typingInterval)
        setPhase('hold')
        // Phase 2: hold for 700ms, then exit
        setTimeout(() => {
          setShowCursor(false)
          setPhase('exit')
          // After exit animation, notify parent
          setTimeout(() => {
            setVisible(false)
            onComplete()
          }, 700)
        }, 700)
      }
    }, 90)

    return () => clearInterval(typingInterval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FBFBFB]"
          initial={{ opacity: 1, y: 0 }}
          animate={
            phase === 'exit'
              ? { opacity: 0, y: -40 }
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Floating cloud logo */}
          <motion.div
            className="mb-8 select-none"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            <Image
              src="/logo-cloud.jpeg"
              alt="CloudPxl cloud logo"
              width={180}
              height={140}
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Typed wordmark */}
          <div className="relative flex items-center justify-center h-20">
            <span
              className="cloudpxl-text select-none"
              aria-label="CloudPxl"
            >
              {typedText}
            </span>
            {showCursor && (
              <span
                className="inline-block w-[3px] h-[0.85em] ml-1 bg-gradient-to-b from-[#999] to-[#111] cursor-blink"
                aria-hidden="true"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
