'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    step: '01',
    title: 'Discovery Sprint',
    desc: 'We map your product matrix, tenant hierarchy, and data models in a focused 48-hour workshop. No fluff, no slide decks — just architecture decisions.',
  },
  {
    step: '02',
    title: 'Blueprint Delivery',
    desc: 'Receive a complete infrastructure blueprint: ERD, service graph, API contract spec, and a phased rollout plan with estimated resource footprint.',
  },
  {
    step: '03',
    title: 'Parallel Engineering',
    desc: 'Multiple squads work concurrently on frontend, backend, and DevOps tracks. Daily async updates keep you aligned without status-meeting fatigue.',
  },
  {
    step: '04',
    title: 'Hardening & Handoff',
    desc: 'Load testing, penetration review, runbook documentation, and a live knowledge-transfer session before your team takes full ownership.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Workflows() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="workflows" className="relative py-32 px-6 lg:px-10">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Header — every element fades in independently */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0}
            className="text-xs font-semibold tracking-widest text-[#0818A8] uppercase block"
          >
            How we work
          </motion.span>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.1}
            className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-[-0.03em] text-[#0A0A0A] leading-[1.1] text-balance"
          >
            A workflow engineered<br />for zero ambiguity.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.2}
            className="mt-4 text-base text-[#0A0A0A]/55 leading-relaxed"
          >
            Four decisive phases. Clear deliverables. A team that treats your deadline as a
            hard constraint, not a suggestion.
          </motion.p>
        </div>

        {/* Steps — each card fades in with stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop only) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.3}
            className="hidden lg:block absolute top-[3.25rem] left-[12.5%] right-[12.5%] h-px bg-[rgba(10,10,10,0.1)] pointer-events-none"
          />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.3 + i * 0.12}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="relative group"
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.45 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-11 h-11 rounded-full bg-[#0818A8] flex items-center justify-center mb-6 text-white text-sm font-black shadow-[0_4px_20px_rgba(8,24,168,0.35)] group-hover:scale-110 transition-transform duration-300"
              >
                {s.step}
              </motion.div>

              <h3 className="text-base font-bold text-[#0A0A0A] tracking-tight mb-3">
                {s.title}
              </h3>
              <p className="text-sm text-[#0A0A0A]/55 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip — fades in last */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0.75}
          className="mt-20 border border-[rgba(10,10,10,0.08)] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-white"
        >
          <div>
            <p className="text-lg font-bold text-[#0A0A0A] tracking-tight">
              Ready to see your architecture?
            </p>
            <p className="text-sm text-[#0A0A0A]/50 mt-1">
              We can deliver a preliminary infrastructure blueprint within 72 hours of your discovery call.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(8,24,168,0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              const el = document.querySelector('#quote')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="shrink-0 bg-[#0818A8] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all"
          >
            Book Discovery Call
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
