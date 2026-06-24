'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, Lock, FileText, Globe } from 'lucide-react'

const badges = [
  { icon: ShieldCheck, label: 'SOC 2 Type II', sub: 'Annual audit' },
  { icon: Lock, label: 'ISO 27001', sub: 'Certified ISMS' },
  { icon: Globe, label: 'GDPR', sub: 'EU compliant' },
  { icon: FileText, label: 'HIPAA Ready', sub: 'BAA available' },
]

const practices = [
  'End-to-end encryption at rest and in transit',
  'Zero-trust network perimeter with mTLS',
  'Automated dependency vulnerability scanning',
  'Immutable audit logs with tamper detection',
  'Role-based access controls on every API surface',
  'Penetration testing on every major release',
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Compliance() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="compliance" className="py-32 px-6 lg:px-10 bg-[#F2F2EE]">
      <div className="max-w-7xl mx-auto" ref={ref}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0}
              className="text-xs font-semibold tracking-widest text-[#0818A8] uppercase block"
            >
              Compliance
            </motion.span>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.1}
              className="mt-4 text-[clamp(2rem,3.8vw,3.2rem)] font-extrabold tracking-[-0.03em] text-[#0A0A0A] leading-[1.1] text-balance"
            >
              Security is not<br />a feature — it&apos;s<br />the foundation.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.2}
              className="mt-6 text-base text-[#0A0A0A]/55 leading-relaxed max-w-sm"
            >
              Every system we ship includes a complete compliance posture out of the box.
              No retrofitting security onto a system that wasn&apos;t designed for it.
            </motion.p>

            {/* Badge grid */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {badges.map((b, i) => (
                <motion.div
                  key={b.label}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  custom={0.3 + i * 0.08}
                  whileHover={{
                    borderColor: 'rgba(8,24,168,0.4)',
                    boxShadow: '0 0 18px rgba(8,24,168,0.12)',
                    transition: { duration: 0.2 },
                  }}
                  className="flex items-center gap-3 bg-white border border-[rgba(10,10,10,0.08)] rounded-xl p-4 transition-all duration-200 cursor-default"
                >
                  <b.icon size={18} className="text-[#0818A8] shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-[#0A0A0A]">{b.label}</p>
                    <p className="text-[11px] text-[#0A0A0A]/45">{b.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — practices */}
          <div className="flex flex-col gap-4 lg:pt-16">
            {practices.map((p, i) => (
              <motion.div
                key={p}
                variants={fadeRight}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={0.2 + i * 0.07}
                whileHover={{
                  x: 4,
                  borderColor: 'rgba(8,24,168,0.25)',
                  boxShadow: '0 0 16px rgba(8,24,168,0.08)',
                  transition: { duration: 0.2 },
                }}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[rgba(10,10,10,0.06)] transition-all duration-200 group cursor-default"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#0818A8] shrink-0 group-hover:scale-125 transition-transform" />
                <p className="text-sm text-[#0A0A0A]/75 font-medium">{p}</p>
              </motion.div>
            ))}

            {/* GDPR box — neon glow on hover */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.65}
              whileHover={{
                boxShadow: '0 0 0 2px rgba(8,24,168,0.35), 0 0 30px rgba(8,24,168,0.18)',
                borderColor: 'rgba(8,24,168,0.5)',
                transition: { duration: 0.25, ease: 'easeOut' },
              }}
              className="mt-4 p-5 bg-[#0818A8]/8 border border-[#0818A8]/20 rounded-xl cursor-default"
            >
              <p className="text-sm font-semibold text-[#0818A8]">GDPR Data Processing</p>
              <p className="text-xs text-[#0A0A0A]/55 mt-1 leading-relaxed">
                All data processing agreements include a full GDPR compliance statement with
                DPA templates available for immediate countersigning.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
