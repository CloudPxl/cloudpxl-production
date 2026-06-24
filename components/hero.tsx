'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Splits text into individual character spans for per-letter animation
function AnimatedHeadline({ children }: { children: string }) {
  const words = children.split(' ')
  return (
    <>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.25em] last:mr-0" style={{ paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              delay: 0.3 + wi * 0.07,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  )
}

export default function Hero() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-16 flex items-center overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Floating 3D logo — 520px (+15%), native CSS float keyframe, screen blend */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block"
        style={{ width: 520, height: 520, animation: 'float-logo 6s ease-in-out infinite' }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/logo-black.png"
            alt=""
            fill
            className="object-contain"
            style={{ mixBlendMode: 'screen' }}
            sizes="520px"
            priority
            aria-hidden="true"
          />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-24 lg:py-0 pb-0">
        <div className="grid grid-cols-1 gap-16 lg:gap-8 items-center min-h-[calc(100vh-64px)]">

          {/* Copy — lg:pr-[480px] guards against logo overlap */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8 max-w-xl lg:pr-0"
            style={{ maxWidth: 'calc(100% - 480px)' } as React.CSSProperties}
          >


            {/* Headline — word-by-word slide-up; pb-2 prevents "y" descender clip */}
            <h1 className="text-[clamp(2.8rem,5.5vw,4.5rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#0A0A0A] text-balance pb-2">
              <AnimatedHeadline>Scalable Multi-Tenant Architecture.</AnimatedHeadline>
              {' '}
              <span className="text-[#0818A8]">
                <AnimatedHeadline>Delivered in Days.</AnimatedHeadline>
              </span>
            </h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg text-[#0A0A0A]/60 leading-relaxed max-w-md"
            >
              We engineer concurrent workflows and enterprise-grade web applications
              for businesses scaling multiple products and massive customer bases.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(8,24,168,0.35)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNav('#quote')}
                className="bg-[#0818A8] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all duration-200"
              >
                Start Your Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, borderColor: '#0818A8', color: '#0818A8' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNav('#capabilities')}
                className="border border-[#0A0A0A]/20 text-[#0A0A0A] font-semibold px-7 py-3.5 rounded-full text-sm transition-all duration-200 hover:bg-[rgba(8,24,168,0.04)]"
              >
                View Capabilities
              </motion.button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex gap-10 pt-4 border-t border-[rgba(10,10,10,0.08)]"
            >
              {[
                { value: '200+', label: 'Enterprise Clients' },
                { value: '99.99%', label: 'Uptime SLA' },
                { value: '<48h', label: 'First Deployment' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold tracking-tight text-[#0A0A0A]">{stat.value}</p>
                  <p className="text-xs text-[#0A0A0A]/50 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
