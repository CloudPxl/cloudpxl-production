'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const capabilities = [
  {
    index: '01',
    title: 'Multi-Tenant Portals',
    subtitle: 'Isolated client environments',
    description:
      'Architect fully isolated tenant environments with dedicated data planes, RBAC, and white-label customization — all from a single deployable codebase.',
    tags: ['Data Isolation', 'RBAC', 'White-Label'],
    back: 'Every tenant gets their own scoped database, API surface, and branding layer. One codebase — infinite isolation.',
  },
  {
    index: '02',
    title: 'Concurrent Workflows',
    subtitle: 'Handling multiple products simultaneously',
    description:
      'We design async-first, event-driven pipelines that allow your platform to orchestrate dozens of simultaneous product lifecycles without state collision.',
    tags: ['Event-Driven', 'Async Queue', 'Zero Downtime'],
    back: 'Kafka-backed queues, idempotent handlers, and dead-letter paths — every workflow survives failure gracefully.',
  },
  {
    index: '03',
    title: 'AI-Driven Automation',
    subtitle: 'Custom logic engines',
    description:
      'Deploy intelligent automation layers that parse unstructured data, route decisions, and trigger cross-system actions — without manual intervention.',
    tags: ['LLM Routing', 'Custom Agents', 'Webhooks'],
    back: 'Context-aware agents that observe, decide, and act — wired directly into your product\'s event stream.',
  },
  {
    index: '04',
    title: 'Edge Infrastructure',
    subtitle: 'Global low-latency delivery',
    description:
      'Serve your most latency-sensitive workloads from 50+ PoPs worldwide. Dynamic at the edge, cached where it matters, always consistent.',
    tags: ['CDN', 'Edge Functions', 'ISR'],
    back: 'Sub-20ms response times globally. Stale-while-revalidate caching that never compromises freshness.',
  },
  {
    index: '05',
    title: 'Observability Stack',
    subtitle: 'Full-spectrum telemetry',
    description:
      'Integrate distributed tracing, structured logging, and real-time alerting into every layer of your infrastructure from day one.',
    tags: ['Tracing', 'Log Pipelines', 'Alerting'],
    back: 'OpenTelemetry spans stitched end-to-end. Anomaly detection that fires before your users notice.',
  },
  {
    index: '06',
    title: 'DevOps Acceleration',
    subtitle: 'Ship faster, break nothing',
    description:
      'CI/CD pipelines, progressive rollouts, automated regression guards — we wire the release machinery so your team ships with confidence.',
    tags: ['CI/CD', 'Canary Deploy', 'Automated QA'],
    back: 'Feature flags, canary splits, and auto-rollback triggers — your release train never stops moving.',
  },
]

function CapabilityCard({ cap, index }: { cap: typeof capabilities[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative cursor-pointer"
      style={{ perspective: '1000px', minHeight: '280px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Card inner — rotates on hover */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
      >
        {/* Front face */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="border border-[rgba(10,10,10,0.08)] rounded-2xl p-8 bg-white overflow-hidden h-full"
        >
          <div
            className="absolute inset-0 bg-[#0818A8]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
          />
          <div className="flex items-start justify-between mb-6">
            <span className="text-4xl font-black text-[rgba(10,10,10,0.06)] tracking-tight select-none">
              {cap.index}
            </span>
            <div className="w-2 h-2 rounded-full bg-[#0818A8] opacity-30 mt-1" />
          </div>
          <h3 className="text-xl font-bold text-[#0A0A0A] tracking-tight leading-snug mb-1">
            {cap.title}
          </h3>
          <p className="text-xs font-semibold text-[#0818A8] uppercase tracking-widest mb-4">
            {cap.subtitle}
          </p>
          <p className="text-sm text-[#0A0A0A]/60 leading-relaxed">
            {cap.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {cap.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold text-[#0A0A0A]/50 bg-[rgba(10,10,10,0.04)] px-3 py-1 rounded-full tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Back face */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0 }}
          className="rounded-2xl p-8 bg-[#0818A8] flex flex-col justify-between overflow-hidden"
        >
          {/* Subtle grid on back */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div>
            <span className="text-5xl font-black text-white/10 tracking-tight select-none block mb-6">
              {cap.index}
            </span>
            <h3 className="text-xl font-bold text-white leading-snug mb-4">
              {cap.title}
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              {cap.back}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {cap.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold text-white/60 bg-white/10 px-3 py-1 rounded-full tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Typing animation with two "thinking" pauses
function TypingText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [displayed, setDisplayed] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [done, setDone] = useState(false)

  // Two pause points mid-text
  const pause1 = Math.floor(text.length * 0.35)
  const pause2 = Math.floor(text.length * 0.70)

  useRef(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (!inView) return
    let i = 0

    const type = () => {
      if (i >= text.length) {
        setDone(true)
        return
      }
      setDisplayed(text.slice(0, i + 1))
      i++

      const isPause = i === pause1 || i === pause2
      timeout = setTimeout(type, isPause ? 700 : 28)
    }
    timeout = setTimeout(type, 200)
    return () => clearTimeout(timeout)
  })

  useEffect(() => {
    if (!inView) return
    let i = 0
    let timeout: ReturnType<typeof setTimeout>

    const type = () => {
      if (i >= text.length) { setDone(true); return }
      setDisplayed(text.slice(0, i + 1))
      i++
      const isPause = i === pause1 || i === pause2
      timeout = setTimeout(type, isPause ? 700 : 28)
    }
    timeout = setTimeout(type, 400)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  // Cursor blink — stops after done
  useEffect(() => {
    if (done) return
    const interval = setInterval(() => setShowCursor((c) => !c), 530)
    return () => clearInterval(interval)
  }, [done])

  return (
    <p className="text-base text-[#0A0A0A]/55 leading-relaxed lg:max-w-sm lg:ml-auto">
      <span ref={ref}>{displayed}</span>
      {!done && (
        <span
          className="inline-block w-[2px] h-[1em] ml-[1px] align-middle bg-[#0818A8] rounded-sm"
          style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
        />
      )}
    </p>
  )
}

export default function Capabilities() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="capabilities" className="relative pt-8 pb-32 px-6 lg:px-10">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="max-w-7xl mx-auto">

        {/* Header — "WHAT WE BUILD" label removed per annotation #4 */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end"
        >
          <div>
            <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold tracking-[-0.03em] text-[#0A0A0A] leading-[1.08] text-balance">
              Engineering capabilities<br />that scale with you.
            </h2>
          </div>
          {/* Typing animation for descriptor paragraph — annotation #5 */}
          <TypingText text="Every system we build is designed for the moment your product needs to absorb 10× the load without a single incident." />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.index} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
