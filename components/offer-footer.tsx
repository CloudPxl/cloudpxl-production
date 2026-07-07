'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-white/10 px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-black.png"
                alt="CloudPxl logo"
                width={44}
                height={36}
                className="object-contain"
              />
              <span className="font-black text-xl tracking-tight text-white">
                Cloud<span className="text-[#6666cc]">Pxl</span>
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Scalable multi-tenant web architecture delivered in days. From landing pages to enterprise applications.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Navigation</h4>
            {[
              { label: 'Pricing', href: '#pricing' },
              { label: 'Add-ons', href: '#addons' },
              { label: 'How We Work', href: '#how-we-work' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors w-fit"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Contact</h4>
            <a
              href="mailto:cloudpxlsupport@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              cloudpxlsupport@gmail.com
            </a>
            <a
              href="tel:+40753669108"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              +40 753 669 108
            </a>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} CloudPxl. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-xs text-white/30">
            <a href="mailto:cloudpxlsupport@gmail.com" className="hover:text-white/60 transition-colors">
              cloudpxlsupport@gmail.com
            </a>
            <span className="hidden sm:inline text-white/15">·</span>
            <a href="tel:+40753669108" className="hover:text-white/60 transition-colors">
              +40 753 669 108
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
