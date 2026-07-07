'use client'

import { motion, type Variants } from 'framer-motion'
import { Phone, FileText, Video, Rocket } from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  }),
}

const steps = [
  {
    icon: Phone,
    title: '1. The Direct Conversation',
    description:
      'No account managers or automated loops. We start with a direct, person-to-person call to understand your business bottlenecks and map out the exact infrastructure you need.',
  },
  {
    icon: FileText,
    title: '2. The Transparent Blueprint',
    description:
      'Once aligned, we provide a clear, itemized proposal. No hidden fees and no technical jargon. You know exactly what you are paying for and when it will be delivered.',
  },
  {
    icon: Video,
    title: '3. Fast, Collaborative Execution',
    description:
      'We build fast, and you are never left in the dark. You can request a 1-on-1 video call at any time to review progress and ensure the project perfectly matches your vision.',
  },
  {
    icon: Rocket,
    title: '4. Launch, Training & Support',
    description:
      'We don\u2019t just hand over the keys. Every launch includes full training on how to manage your platform, plus 7 days of dedicated support to ensure a flawless rollout.',
  },
]

export default function HowWeWork() {
  return (
    <section
      id="how-we-work"
      className="bg-[#0D0D0D] px-6 py-24 md:py-32"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          custom={0}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6666cc] mb-4">
            Our Process
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight text-balance mb-4">
            How We Work
          </h2>
          <p className="text-base text-white/50 max-w-md mx-auto leading-relaxed">
            Transparent, founder-led development with zero guesswork.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="group relative flex flex-col gap-5 bg-white/4 border border-white/8 rounded-2xl p-8 hover:border-[#6666cc]/40 hover:bg-white/6 transition-all duration-300"
              >
                {/* Step accent line */}
                <div className="absolute top-0 left-8 w-8 h-[2px] bg-[#6666cc] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-[#6666cc]/12 border border-[#6666cc]/20 flex items-center justify-center mt-2">
                  <Icon className="w-5 h-5 text-[#6666cc]" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-white leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
