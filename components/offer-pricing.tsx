'use client'

import { motion, type Variants } from 'framer-motion'
import { Check, Star, Clock } from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  }),
}

interface PricingFeature {
  label: string
  cascade?: boolean
}

interface PricingPlan {
  name: string
  price: string
  description: string
  deliveryBadge: string
  features: PricingFeature[]
  highlighted: boolean
}

const plans: PricingPlan[] = [
  {
    name: 'Cloud Start',
    price: '€200',
    description: 'Perfect for getting your first professional web presence live, fast, and converting.',
    deliveryBadge: 'Fast Delivery: 3–6 Business Days',
    features: [
      { label: '1 Custom Landing Page OR 1 Blog structure' },
      { label: '1 Smart Integration (e.g., Automated Emails or Google Reviews)' },
      { label: 'Basic On-Page SEO (Get found on Google searches)' },
      { label: 'Direct Action Buttons (WhatsApp, Phone, Socials)' },
      { label: '100% Mobile-first responsive layout' },
      { label: 'Built-in Security (SSL Certificate included)' },
    ],
    highlighted: false,
  },
  {
    name: 'Cloud Growth',
    price: '€400',
    description: 'The complete digital presence for growing businesses and local corporate brands.',
    deliveryBadge: 'Delivery Time: 5–7 Business Days',
    features: [
      { label: 'Everything in Cloud Start, plus:', cascade: true },
      { label: 'Up to 7 Custom Pages (Home, Services, About, Contact)' },
      { label: 'Easy-to-use Visual CMS (Update text/photos yourself with zero coding)' },
      { label: 'Multiple Smart Integrations (Client Booking, Contact Forms, Maps)' },
      { label: 'Advanced SEO Setup + Google Search Console connection' },
      { label: 'Advanced Firewall and cyber-attack protection' },
      { label: 'Video training tutorial' },
    ],
    highlighted: true,
  },
  {
    name: 'Cloud Enterprise',
    price: '€1,000',
    description: 'Full-power e-commerce stores and custom web applications built for massive scale.',
    deliveryBadge: 'Custom Project: Tailored Timeline',
    features: [
      { label: 'Everything in Cloud Growth, plus:', cascade: true },
      { label: 'Full E-Commerce Store OR Dedicated Custom Web Application' },
      { label: 'Advanced Admin Panel (Manage inventory, orders, and clients)' },
      { label: 'Secure Payment Gateways (Stripe/PayU) + Automated Invoicing' },
      { label: 'Scalable architecture built for heavy concurrent traffic' },
      { label: 'Premium database encryption & continuous monitoring' },
      { label: 'Dedicated platform training & Priority technical support' },
    ],
    highlighted: false,
  },
]

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const isHighlighted = plan.highlighted

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      className={`relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 ${
        isHighlighted
          ? 'bg-[#000075] text-white shadow-2xl shadow-[#000075]/30 scale-105 z-10'
          : 'bg-white border border-[#E5E5E5] hover:border-[#000075]/30 hover:shadow-xl hover:shadow-[#000075]/8'
      }`}
    >
      {/* Most Popular badge */}
      {isHighlighted && (
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <div className="inline-flex items-center gap-1.5 bg-white text-[#000075] text-xs font-bold px-5 py-2 rounded-b-2xl shadow-md uppercase tracking-widest">
            <Star className="w-3.5 h-3.5 fill-current" />
            Most Popular
          </div>
        </div>
      )}

      <div className={`flex flex-col flex-1 p-8 ${isHighlighted ? 'pt-14' : ''}`}>
        {/* Plan name */}
        <h3
          className={`text-xl font-black tracking-tight mb-2 ${
            isHighlighted ? 'text-white' : 'text-[#111111]'
          }`}
        >
          {plan.name}
        </h3>

        <p
          className={`text-sm leading-relaxed mb-5 ${
            isHighlighted ? 'text-white/75' : 'text-[#666666]'
          }`}
        >
          {plan.description}
        </p>

        {/* Price + TVA */}
        <div className="mb-4 flex flex-col gap-0.5">
          <span
            className={`text-3xl font-black tracking-tight ${
              isHighlighted ? 'text-white' : 'text-[#111111]'
            }`}
          >
            {plan.price}
          </span>
          <span
            className={`text-xs font-semibold ${
              isHighlighted ? 'text-white/55' : 'text-[#999999]'
            }`}
          >
            + 21% TVA
          </span>
        </div>

        {/* Delivery badge */}
        <div
          className={`inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-lg text-xs font-semibold mb-6 ${
            isHighlighted
              ? 'bg-white/15 text-white'
              : 'bg-[#000075]/8 text-[#000075]'
          }`}
        >
          <Clock className="w-3 h-3 flex-shrink-0" />
          {plan.deliveryBadge}
        </div>

        {/* Divider */}
        <div
          className={`h-px mb-6 ${
            isHighlighted ? 'bg-white/15' : 'bg-[#E5E5E5]'
          }`}
        />

        {/* Features list */}
        <ul className="flex flex-col gap-3 flex-1">
          {plan.features.map((f, i) =>
            f.cascade ? (
              <li key={i} className="flex items-center gap-2 mt-1 mb-0.5">
                <span
                  className={`text-xs font-extrabold uppercase tracking-wider ${
                    isHighlighted ? 'text-white/90' : 'text-[#000075]'
                  }`}
                >
                  {f.label}
                </span>
              </li>
            ) : (
              <li key={i} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                    isHighlighted ? 'bg-white/15' : 'bg-[#000075]/8'
                  }`}
                >
                  <Check
                    className={`w-3 h-3 ${
                      isHighlighted ? 'text-white' : 'text-[#000075]'
                    }`}
                    strokeWidth={3}
                  />
                </span>
                <span
                  className={`text-sm leading-snug ${
                    isHighlighted ? 'text-white/90' : 'text-[#333333]'
                  }`}
                >
                  {f.label}
                </span>
              </li>
            )
          )}
        </ul>
      </div>
    </motion.div>
  )
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative bg-[#FBFBFB] px-6 pt-24 pb-24 md:pb-32 overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,0,117,0.04) 0%, transparent 70%)',
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
            className="inline-flex items-center gap-2 border border-[#000075]/20 bg-[#000075]/5 text-[#000075] text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-widest"
          >
            Transparent Pricing
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-balance font-black text-[#111111] leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Choose the right plan for{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #000075 0%, #1a1aaa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              your business
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="max-w-xl text-[#666666] leading-relaxed"
          >
            High-performance web solutions, scaled to your business goals and budget. All prices exclude 21% TVA.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-sm text-[#888888] mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          All prices are starting prices. Final quote depends on project scope and complexity.
          <br className="hidden md:block" />
          Need something custom?{' '}
          <a href="#contact" className="text-[#000075] font-semibold hover:underline">
            Contact us
          </a>{' '}
          for a tailored proposal.
        </motion.p>
      </div>
    </section>
  )
}
