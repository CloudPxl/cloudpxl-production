'use client'

import { motion, type Variants } from 'framer-motion'
import { Mail, Phone, MessageCircle } from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  }),
}

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'cloudpxlsupport@gmail.com',
    href: 'mailto:cloudpxlsupport@gmail.com',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+40 753 669 108',
    href: 'https://wa.me/40753669108',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+40 753 669 108',
    href: 'tel:+40753669108',
  },
]

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-[#FBFBFB] border-t border-[#E5E5E5] px-6 py-20 md:py-24"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="flex flex-col items-center text-center gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Heading */}
          <motion.div variants={fadeUp} custom={0} className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#000075]">
              Get in Touch
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-[#111111] tracking-tight text-balance">
              Ready to start? Reach out directly:
            </h2>
          </motion.div>

          {/* Contact cards */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
          >
            {contacts.map((c) => {
              const Icon = c.icon
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex flex-col items-center gap-3 bg-white border border-[#E5E5E5] rounded-2xl px-6 py-7 hover:border-[#000075]/30 hover:shadow-lg hover:shadow-[#000075]/6 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#000075]/8 flex items-center justify-center group-hover:bg-[#000075]/12 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#000075]" />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#888888]">
                      {c.label}
                    </span>
                    <span className="text-sm font-semibold text-[#111111] text-center break-all">
                      {c.value}
                    </span>
                  </div>
                </a>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
