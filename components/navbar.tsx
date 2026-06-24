'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { createClient } from '../utils/supabase/client' // Verify this path matches your structure
import type { User } from '@supabase/supabase-js'

const links = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'Workflows', href: '#workflows' },
  { label: 'Compliance', href: '#compliance' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  // Initialize Supabase client
  const supabase = createClient()

  useEffect(() => {
    // Scroll listener
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)

    // Auth state listener
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    // Listen for sign in / sign out events dynamically
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      window.removeEventListener('scroll', onScroll)
      subscription.unsubscribe()
    }
  }, [supabase])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setMobileOpen(false)
    window.location.reload() // Force a clean state reset
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

          {/* CTA & User Profile */}
          <div className="hidden md:flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(8,24,168,0.35)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNav('#quote')}
              className="bg-[#0818A8] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200"
            >
              Request Custom Quote
            </motion.button>

            {/* The Dynamic Auth Section */}
            {user ? (
              <div className="relative group">
                {/* Avatar Bubble */}
                <button className="w-10 h-10 rounded-full bg-[#0818A8]/10 border border-[#0818A8]/20 flex items-center justify-center text-[#0818A8] font-semibold text-sm transition-all duration-200 hover:bg-[#0818A8] hover:text-white cursor-pointer">
                  {user.email?.charAt(0).toUpperCase() ?? 'U'}
                </button>
                
                {/* Hover Dropdown */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  <div className="px-4 py-3 border-b border-black/5">
                    <p className="text-xs text-[#0A0A0A]/50 font-medium uppercase tracking-wider mb-1">Authenticated</p>
                    <p className="text-sm font-medium text-[#0A0A0A] truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors mt-1"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <a
                href="/login"
                className="text-sm font-medium text-[#0A0A0A]/70 hover:text-[#0818A8] transition-colors duration-200 tracking-tight"
              >
                Log In
              </a>
            )}
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
            className="fixed top-16 left-0 right-0 z-40 bg-[#F7F7F3]/95 backdrop-blur-md border-b border-[rgba(10,10,10,0.08)] px-6 py-6 flex flex-col gap-4 shadow-lg"
          >
            {user && (
              <div className="pb-4 mb-2 border-b border-black/5">
                <p className="text-xs text-[#0A0A0A]/50 font-medium uppercase tracking-wider mb-1">Signed in as</p>
                <p className="text-sm font-semibold text-[#0818A8] truncate">{user.email}</p>
              </div>
            )}

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

            {user ? (
              <button
                onClick={handleSignOut}
                className="mt-2 bg-red-50 text-red-600 text-sm font-semibold px-5 py-2.5 rounded-full w-full hover:bg-red-100 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <a
                href="/login"
                className="mt-2 text-center border border-black/10 text-[#0A0A0A] text-sm font-semibold px-5 py-2.5 rounded-full w-full hover:bg-black/5 transition-colors"
              >
                Log In
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}