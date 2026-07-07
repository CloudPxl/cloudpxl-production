'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
  Palette,
  Search,
  MapPin,
  Bot,
  Plug,
  Image,
  Users,
  FileText,
  MessageCircle,
  ScrollText,
  Layout,
  Star,
  Share2,
  Mail,
  CalendarCheck,
  CreditCard,
  Map,
  BellRing,
  BarChart2,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Sparkles,
  TrendingUp,
} from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  }),
}

interface Addon {
  icon: React.ElementType
  title: string
  price: string
  description: string
}

const DEFAULT_COUNT = 8

const addons: Addon[] = [
  {
    icon: Palette,
    title: 'Logo & Brand Refresh',
    price: 'from €80 + TVA',
    description: 'We modernize your existing logo or create a clean, professional new brand identity from scratch.',
  },
  {
    icon: Search,
    title: 'Custom SEO',
    price: 'from €100 + TVA',
    description: 'Maximize your visibility on Google. We optimize your site structure and keywords so customers find you first.',
  },
  {
    icon: MapPin,
    title: 'Custom GEO',
    price: 'from €100 + TVA',
    description: 'Dominate local search results. We optimize your digital footprint to capture clients in your specific city and on Google Maps.',
  },
  {
    icon: Sparkles,
    title: 'Custom AEO',
    price: 'from €150 + TVA',
    description: 'Future-proof your business. We structure your data so AI platforms like ChatGPT and Gemini recommend your services.',
  },
  {
    icon: Plug,
    title: 'Custom API Integrations',
    price: 'from €100 + TVA',
    description: 'Save hours of manual work. We connect your site directly to your favorite tools (Zapier, Make, custom webhooks).',
  },
  {
    icon: Image,
    title: 'Premium Photo Library',
    price: 'from €100 + TVA',
    description: "Don't have your own photos? We curate high-quality, fully licensed commercial imagery perfectly tailored to your industry.",
  },
  {
    icon: Users,
    title: 'CRM Lead Sync',
    price: 'from €100 + TVA',
    description: 'Automatically route new website inquiries and contact forms directly into your sales pipeline.',
  },
  {
    icon: FileText,
    title: 'Invoice Automation',
    price: 'from €150 + TVA',
    description: 'Automatically generate draft invoices in your Romanian accounting software when a client submits an order.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp / Telegram Lead Routing',
    price: 'from €100 + TVA',
    description: 'Get instant mobile notifications. A bot pings your team the second a lead fills out a form.',
  },
  {
    icon: ScrollText,
    title: 'Automated Contract Generation',
    price: 'from €150 + TVA',
    description: 'Take user input from a form and automatically generate, sign, and email a branded PDF document or NDA.',
  },
  {
    icon: Layout,
    title: 'Notion Project Board Sync',
    price: 'from €100 + TVA',
    description: 'Push client inquiries or support tickets directly into your internal Notion Kanban boards.',
  },
  {
    icon: Star,
    title: 'Automated Google Review Funnel',
    price: 'from €100 + TVA',
    description: 'Automatically send an email or SMS to clients after a purchase, asking for a 5-star Google Review.',
  },
  {
    icon: Share2,
    title: 'Instagram Feed Auto-Sync',
    price: 'from €50 + TVA',
    description: 'Pull your live Instagram feed directly into your website so your portfolio updates automatically.',
  },
  {
    icon: Mail,
    title: 'Email Marketing Sync',
    price: 'from €80 + TVA',
    description: 'Automatically add newsletter subscribers to specific email tagging sequences based on their actions.',
  },
  {
    icon: Bot,
    title: 'AI Customer Support Bot',
    price: 'from €200 + TVA',
    description: 'A custom chatbot trained exclusively on your business data to answer customer questions 24/7.',
  },
  {
    icon: CalendarCheck,
    title: 'Deep Calendar Integration',
    price: 'from €80 + TVA',
    description: 'Fully white-labeled booking systems embedded directly into the site, syncing with your Google Calendar.',
  },
  {
    icon: CreditCard,
    title: 'Direct Payment Links',
    price: 'from €100 + TVA',
    description: 'Generate dynamic payment links for retainer fees or consultation deposits directly upon form submission.',
  },
  {
    icon: Map,
    title: 'Dynamic Delivery Zones',
    price: 'from €150 + TVA',
    description: 'An interactive map widget where users type their address to see if they are in your service or delivery radius.',
  },
  {
    icon: BellRing,
    title: 'SMS Appointment Reminders',
    price: 'from €100 + TVA',
    description: 'Reduce no-shows by automatically triggering an SMS reminder 2 hours before a booked consultation.',
  },
  {
    icon: BarChart2,
    title: 'Custom Analytics Dashboard',
    price: 'from €200 + TVA',
    description: 'A private, secure admin portal where you can see exactly how users interact with your website data.',
  },
  {
    icon: ShoppingCart,
    title: 'Marketplace API Sync (eMag)',
    price: 'from €250 + TVA',
    description: "Sync your website's inventory and product catalog directly with your eMag seller account.",
  },
]

const HIDDEN_COUNT = addons.length - DEFAULT_COUNT

export default function AddonsSection() {
  const [expanded, setExpanded] = useState(false)

  const visibleAddons = expanded ? addons : addons.slice(0, DEFAULT_COUNT)

  return (
    <section
      id="addons"
      className="relative bg-[#111111] px-6 py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="flex flex-col items-center text-center gap-4 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 border border-white/15 bg-white/8 text-white/80 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-widest"
          >
            Enhance Your Project
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-balance font-black text-white leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Optional{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6666cc 0%, #aaaaff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Add-ons
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="max-w-xl text-white/55 leading-relaxed"
          >
            Supercharge any plan with targeted services. Add only what you need, exactly when you need it. All prices exclude 21% TVA.
          </motion.p>
        </motion.div>

        {/* Add-ons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence initial={false}>
            {visibleAddons.map((addon, i) => {
              const Icon = addon.icon
              return (
                <motion.div
                  key={addon.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.4, delay: i >= DEFAULT_COUNT ? (i - DEFAULT_COUNT) * 0.04 : 0, ease: [0.4, 0, 0.2, 1] }}
                  className="group flex flex-col gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#000075]/40 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#8888ff]" />
                    </div>
                    <span className="text-xs font-semibold text-[#8888ff] bg-[#000075]/30 px-2.5 py-1 rounded-lg whitespace-nowrap">
                      {addon.price}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">{addon.title}</h3>
                    <p className="text-xs leading-relaxed text-white/50">{addon.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* Info card — always last, no CTA button */}
          <motion.div
            layout
            className="flex flex-col items-center justify-center gap-3 bg-[#000075] border border-[#000075] rounded-2xl p-7 text-center sm:col-span-2 lg:col-span-4"
          >
            <p className="text-white font-semibold text-base leading-snug">
              Need a custom combination?
            </p>
            <p className="text-white/65 text-sm leading-relaxed max-w-sm">
              Reach out directly via email or WhatsApp to get a tailored quote for your specific project needs.
            </p>
            <p className="text-white/80 text-sm font-semibold">
              cloudpxlsupport@gmail.com &nbsp;·&nbsp; +40 753 669 108
            </p>
          </motion.div>
        </div>

        {/* Show More / Show Less toggle */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex items-center gap-2.5 border border-white/15 bg-white/6 text-white/80 hover:bg-white/12 hover:text-white hover:border-white/25 transition-all duration-200 px-7 py-3.5 rounded-xl text-sm font-semibold"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Explore {HIDDEN_COUNT} More Integrations &amp; Add-ons
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
