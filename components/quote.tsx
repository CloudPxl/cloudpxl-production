'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { submitQuote } from '@/app/actions/quote' // Adjust this import path to match where you saved the action

const steps = [
  {
    id: 1,
    label: 'About You',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Doe' },
      { name: 'company', label: 'Company', type: 'text', placeholder: 'Acme Corp' },
      { name: 'email', label: 'Work Email', type: 'email', placeholder: 'jane@acme.com' },
    ],
  },
  {
    id: 2,
    label: 'Scale',
    fields: [
      { name: 'users', label: 'Number of End Users', type: 'text', placeholder: 'e.g. 10,000+' },
      { name: 'products', label: 'Products / Tenants', type: 'text', placeholder: 'e.g. 5 product lines' },
    ],
  },
  {
    id: 3,
    label: 'Architecture',
    fields: [
      {
        name: 'needs',
        label: 'Architecture Needs',
        type: 'textarea',
        placeholder: 'Describe your technical requirements, stack preferences, integrations, compliance needs…',
      },
    ],
  },
]

export default function Quote() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [current, setCurrent] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleChange = (name: string, value: string) => {
    setErrorMsg(null)
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = async () => {
    if (current < steps.length - 1) {
      // Basic validation for the first step
      if (current === 0 && (!formData.name || !formData.email)) {
        setErrorMsg('Name and email are required to continue.')
        return
      }
      setCurrent((c) => c + 1)
    } else {
      // Final Step: Submit Data
      setIsSubmitting(true)
      setErrorMsg(null)
      
      try {
        const response = await submitQuote(formData)
        
        if (response.error) {
          setErrorMsg(response.error)
        } else {
          setSubmitted(true)
        }
      } catch (err) {
        setErrorMsg('An unexpected error occurred.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <section id="quote" className="py-0">
      {/* Blue banner */}
      <div className="bg-[#0818A8] px-6 lg:px-10 py-24">
        <div className="max-w-7xl mx-auto text-center">
          <div ref={ref}>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                animate={inView ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2rem,4.5vw,3.8rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.08] text-balance"
              >
                Every infrastructure is unique.
                <br />
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={inView ? { y: '0%', opacity: 1 } : {}}
                  transition={{ delay: 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  Your quota should be too.
                </motion.span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-white/75 text-base leading-relaxed max-w-lg mx-auto"
            >
              We do not believe in tier-based limitations. Tell us about your concurrent workflow
              needs, and we will architect a precise technical and financial roadmap.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-[#F7F7F3] px-6 lg:px-10 pb-32">
        <div className="max-w-2xl mx-auto -mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.1)] p-8 lg:p-12"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-[#0818A8] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A0A0A] tracking-tight">
                    Request received.
                  </h3>
                  <p className="mt-3 text-[#0A0A0A]/55 leading-relaxed">
                    A senior engineer will review your requirements and reach out within 24 hours
                    with a preliminary architecture scope.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={`step-${current}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Progress */}
                  <div className="flex items-center gap-2 mb-8">
                    {steps.map((s, i) => (
                      <div key={s.id} className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                            i <= current
                              ? 'bg-[#0818A8] text-white'
                              : 'bg-[rgba(10,10,10,0.06)] text-[#0A0A0A]/40'
                          }`}
                        >
                          {i < current ? <Check size={12} /> : s.id}
                        </div>
                        {i < steps.length - 1 && (
                          <div className={`h-px w-10 transition-all duration-300 ${i < current ? 'bg-[#0818A8]' : 'bg-[rgba(10,10,10,0.1)]'}`} />
                        )}
                      </div>
                    ))}
                    <span className="ml-3 text-xs text-[#0A0A0A]/40 font-medium">
                      {steps[current].label}
                    </span>
                  </div>

                  {/* Error Message */}
                  {errorMsg && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
                      {errorMsg}
                    </div>
                  )}

                  {/* Fields */}
                  <div className="flex flex-col gap-5">
                    {steps[current].fields.map((field) => (
                      <div key={field.name}>
                        <label className="block text-xs font-semibold text-[#0A0A0A]/60 uppercase tracking-wider mb-2">
                          {field.label}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea
                            rows={5}
                            placeholder={field.placeholder}
                            value={formData[field.name] ?? ''}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            className="w-full border border-[rgba(10,10,10,0.12)] rounded-xl px-4 py-3 text-sm text-[#0A0A0A] bg-transparent placeholder:text-[#0A0A0A]/30 focus:outline-none focus:border-[#0818A8] focus:ring-2 focus:ring-[#0818A8]/10 transition-all resize-none"
                          />
                        ) : (
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={formData[field.name] ?? ''}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            className="w-full border border-[rgba(10,10,10,0.12)] rounded-xl px-4 py-3 text-sm text-[#0A0A0A] bg-transparent placeholder:text-[#0A0A0A]/30 focus:outline-none focus:border-[#0818A8] focus:ring-2 focus:ring-[#0818A8]/10 transition-all"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  <div className="mt-8 flex items-center justify-between">
                    {current > 0 ? (
                      <button
                        onClick={() => setCurrent((c) => c - 1)}
                        className="text-sm text-[#0A0A0A]/50 hover:text-[#0A0A0A] transition-colors"
                        disabled={isSubmitting}
                      >
                        ← Back
                      </button>
                    ) : (
                      <span />
                    )}
                    <motion.button
                      whileHover={!isSubmitting ? { scale: 1.03, boxShadow: '0 8px 30px rgba(8,24,168,0.35)' } : {}}
                      whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                      onClick={handleNext}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 bg-[#0818A8] text-white font-semibold px-7 py-3 rounded-full text-sm disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Processing
                        </>
                      ) : current === steps.length - 1 ? (
                        <>
                          Submit Request
                          <ArrowRight size={14} />
                        </>
                      ) : (
                        <>
                          Continue
                          <ArrowRight size={14} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}