'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const pillars = [
  { label: 'PostgreSQL', desc: 'Row-level isolation' },
  { label: 'Redis Cluster', desc: 'Sub-ms cache layer' },
  { label: 'gRPC', desc: 'Service mesh comms' },
  { label: 'Kafka', desc: 'Event streaming' },
  { label: 'k8s', desc: 'Container orchestration' },
  { label: 'Terraform', desc: 'IaC provisioning' },
  { label: 'OpenTelemetry', desc: 'Distributed tracing' },
  { label: 'Vault', desc: 'Secrets management' },
]

export default function Infrastructure() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="infrastructure" className="py-32 px-6 lg:px-10 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={ref}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-semibold tracking-widest text-[#0818A8] uppercase">
              Infrastructure
            </span>
            <h2 className="mt-4 text-[clamp(2rem,3.8vw,3.2rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1] text-balance">
              Battle-tested stack.<br />
              <span className="text-[#0818A8]">Zero single points</span><br />
              of failure.
            </h2>
            <p className="mt-6 text-[#ffffff]/50 leading-relaxed text-base max-w-md">
              Our infrastructure layer is built on proven open-source primitives, hardened for
              enterprise SLAs, and monitored 24/7 with automated remediation runbooks.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { metric: '50+', desc: 'Global PoPs' },
                { metric: '< 5ms', desc: 'P99 API latency' },
                { metric: '99.99%', desc: 'SLA commitment' },
                { metric: '10M+', desc: 'Daily events processed' },
              ].map((item, i) => (
                <motion.div
                  key={item.desc}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.04, borderColor: 'rgba(8,24,168,0.3)', transition: { duration: 0.2 } }}
                  className="border border-white/10 rounded-xl p-5 bg-white/[0.03] cursor-default"
                >
                  <p className="text-2xl font-black text-white tracking-tight">{item.metric}</p>
                  <p className="text-xs text-white/40 mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — tech pillars + image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >


            {/* Tech pillars */}
            <div className="grid grid-cols-2 gap-3">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 border border-white/8 rounded-xl px-4 py-3 bg-white/[0.03] hover:border-[#0818A8]/40 hover:bg-[#0818A8]/5 transition-all duration-200 group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0818A8] shrink-0 group-hover:scale-125 transition-transform" />
                  <div>
                    <p className="text-white text-sm font-semibold">{p.label}</p>
                    <p className="text-white/35 text-[11px]">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
