'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'Workflows', href: '#workflows' },
  { label: 'Compliance', href: '#compliance' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-md bg-[#F7F7F3]/80 border-b border-[rgba(10,10,10,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo — text only */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center shrink-0 group"
            aria-label="CloudPxl home"
          >
            <span className="text-[#0A0A0A] font-bold text-lg tracking-tight leading-none">
              Cloud<span className="text-[#0818A8]">Pxl</span>
            </span>
          </a>

          {/* Center nav links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-sm font-medium text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors duration-200 tracking-tight"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(8,24,168,0.35)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNav('#quote')}
              className="bg-[#0818A8] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200"
            >
              Request Custom Quote
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#0A0A0A] p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#F7F7F3]/95 backdrop-blur-md border-b border-[rgba(10,10,10,0.08)] px-6 py-6 flex flex-col gap-4"
          >
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-left text-base font-medium text-[#0A0A0A]/80 hover:text-[#0818A8] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('#quote')}
              className="mt-2 bg-[#0818A8] text-white text-sm font-semibold px-5 py-2.5 rounded-full w-full"
            >
              Request Custom Quote
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
