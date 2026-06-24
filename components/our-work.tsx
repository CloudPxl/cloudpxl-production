'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: '01',
    title: 'Lario Luminance',
    category: 'Maritime & Luxury Yachting',
    description:
      'Curation of private voyages and bespoke asset management across the waters of Lake Como. Built with an editorial layout emphasizing high-end typography and slow-motion cinematography.',
    tags: ['Premium UX', 'Next.js', 'Motion Design'],
    accentColor: '#0818A8',
    placeholderGradient: 'from-[#0818A8]/30 via-[#060f80]/40 to-[#0A0A0A]',
    videoSrc: '/assets/lario-yacht.mp4',
    stat: { value: 'Luxury', label: 'Yacht Experience' },
  },
  {
    id: '02',
    title: 'OpsCore — Workflow Engine',
    category: 'Enterprise Event-Driven Engineering',
    description:
      'An event-driven data pipeline orchestrator processing 3M+ concurrent serverless jobs per day. Features high-density metric visualization dashboards, latency matrices, and real-time integration ledgers.',
    tags: ['Kafka', 'gRPC', 'k8s'],
    accentColor: '#00C9A7',
    placeholderGradient: 'from-[#00C9A7]/20 via-[#001a16] to-[#0A0A0A]',
    videoSrc: '/assets/opscore-workflow.mp4',
    stat: { value: '3M+', label: 'Daily Jobs' },
  },
  {
    id: '03',
    title: 'Maison Valmont',
    category: 'Ultra-Luxury Monaco Private Advisory',
    description:
      'A minimalist, silk-toned single-page portal built for an exclusive Monaco-based estate advisory. Relies heavily on asymmetrical whitespace, Mediterranean structural archways, and slow-fade transitions.',
    tags: ['Editorial Design', 'Next.js', 'Motion'],
    accentColor: '#F59E0B',
    placeholderGradient: 'from-[#F59E0B]/20 via-[#1a1200] to-[#0A0A0A]',
    videoSrc: '/assets/maison-valmont.mp4',
    stat: { value: 'Monaco', label: 'Private Advisory' },
  },
  {
    id: '04',
    title: 'Meridian — AI CRM Platform',
    category: 'Next-Gen AI CRM Systems',
    description:
      'Customer intelligence engine automated to route and synthesize 100k+ daily sales interactions. Designed with clean glassmorphic layers, autonomous workflow cards, and reactive data pipelines.',
    tags: ['LLM Routing', 'Webhooks', 'Vector DB'],
    accentColor: '#A855F7',
    placeholderGradient: 'from-[#A855F7]/20 via-[#120a1f] to-[#0A0A0A]',
    videoSrc: '/assets/meridian-crm.mp4',
    stat: { value: '100k+', label: 'Daily Interactions' },
  },
]

function WorkCard({
  project,
  index,
  inView,
}: {
  project: typeof projects[0]
  index: number
  inView: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (videoRef.current) {
      // Freeze on current frame — do NOT reset to 0
      videoRef.current.pause()
    }
  }, [])

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl overflow-hidden border border-white/8 bg-[#111] cursor-pointer"
      whileHover={{
        y: -8,
        boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)`,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* ── Media area: strict 16:9, overflow-hidden to clip video to rounded corners ── */}
      <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-neutral-950 border-b border-white/10">

        {/* Video — permanently in DOM, #t=0.001 forces first-frame poster extraction */}
        <video
          ref={videoRef}
          src={`${project.videoSrc}#t=0.001`}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-contain scale-[0.98]"
          aria-hidden="true"
        />

        {/* Vignette — always present for smooth card body transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent pointer-events-none" />

        {/* Category chip */}
        <div className="absolute top-4 left-4">
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
            style={{
              color: project.accentColor,
              borderColor: `${project.accentColor}50`,
              backgroundColor: `${project.accentColor}18`,
              backdropFilter: 'blur(8px)',
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-white font-bold text-lg leading-snug tracking-tight">
            {project.title}
          </h3>
          <motion.div
            animate={{ rotate: isHovered ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0 mt-0.5"
          >
            <ArrowUpRight
              size={18}
              className="text-white/30 group-hover:text-white/80 transition-colors duration-200"
            />
          </motion.div>
        </div>

        <p className="text-white/45 text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-semibold text-white/35 bg-white/[0.06] border border-white/8 px-3 py-1 rounded-full tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line that grows on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ backgroundColor: project.accentColor }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.article>
  )
}

export default function OurWork() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="our-work" className="py-32 px-6 lg:px-10 bg-[#0A0A0A] relative overflow-hidden">
      {/* Radial spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#0818A8]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative" ref={ref}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col lg:flex-row lg:items-end gap-6 justify-between"
        >
          <div>
            <span className="text-xs font-semibold tracking-widest text-[#0818A8] uppercase">
              Selected work
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1] text-balance">
              Projects that define<br />
              <span className="text-[#0818A8]">what we stand for.</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm leading-relaxed lg:max-w-[280px] lg:text-right">
            Every engagement is an opportunity to set a new internal benchmark. Hover a card to preview.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <WorkCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 text-center text-white/20 text-xs tracking-wide"
        >
          Hover cards to preview · Full video case studies launching soon
        </motion.p>
      </div>
    </section>
  )
}
