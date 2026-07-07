'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 bg-[#FBFBFB]/90 backdrop-blur-sm border-b border-[#E5E5E5]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex items-center gap-3">
        <Image
          src="/logo-black.png"
          alt="CloudPxl logo"
          width={44}
          height={36}
          className="object-contain"
        />
        <span className="font-black text-xl tracking-tight text-[#111111]">
          Cloud<span className="text-[#000075]">Pxl</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#444444]">
        <a href="#pricing" className="hover:text-[#000075] transition-colors">Pricing</a>
        <a href="#addons" className="hover:text-[#000075] transition-colors">Add-ons</a>
        <a href="#how-we-work" className="hover:text-[#000075] transition-colors">How We Work</a>
        <a href="#contact" className="hover:text-[#000075] transition-colors">Contact</a>
      </div>
    </motion.nav>
  )
}
