'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'

interface Message {
  role: 'bot' | 'user'
  text: string
}

// Updated, friendly greeting
const GREETING =
  "Hi there! I'm the CloudPxl assistant. Let me know what you're looking to build, or feel free to ask me any questions about how we work."

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: 'bot', text: GREETING }])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text) return

    const newMessages = [...messages, { role: 'user', text }]
    setMessages(newMessages as Message[])
    setInput('')
    setIsTyping(true)

    try {
      const apiMessages = newMessages.map(m => ({ 
        role: m.role === 'bot' ? 'assistant' : 'user', 
        content: m.text 
      }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = '' // The buffer fixes the chopped-JSON bug
      
      setMessages((m) => [...m, { role: 'bot', text: '' }])
      setIsTyping(false)

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        
        // Keep the last incomplete line in the buffer
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed || !trimmed.startsWith('data: ')) continue
          
          const message = trimmed.replace(/^data: /, '')
          if (message === '[DONE]') break

          try {
            const parsed = JSON.parse(message)
            const token = parsed.choices[0]?.delta?.content || ''
            
            if (token) {
              setMessages((m) => {
                const all = [...m]
                const last = all.length - 1
                all[last] = { ...all[last], text: all[last].text + token }
                return all
              })
            }
          } catch (e) {
            // Silently ignore malformed chunks, the buffer will catch the rest on the next pass
          }
        }
      }
    } catch (error) {
      setMessages((m) => [...m, { role: 'bot', text: 'Connection interrupted. Please try again.' }])
      setIsTyping(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-[340px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-[rgba(10,10,10,0.08)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#0818A8] px-5 py-4 flex items-center justify-between shrink-0">
              <div>
                <p className="text-white font-bold text-sm">CloudPxl AI Architect</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-white/70 text-[11px]">Online now</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto px-4 py-4 flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-[#0818A8] text-white rounded-br-sm'
                        : 'bg-[rgba(10,10,10,0.05)] text-[#0A0A0A] rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[rgba(10,10,10,0.05)] text-[#0A0A0A]/50 rounded-2xl rounded-bl-sm px-4 py-2.5">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} className="h-1" />
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-[rgba(10,10,10,0.05)] shrink-0 bg-white">
              <div className="flex items-center gap-2 border border-[rgba(10,10,10,0.12)] rounded-xl px-3 py-2.5 focus-within:border-[#0818A8] focus-within:ring-2 focus-within:ring-[#0818A8]/10 transition-all bg-white">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isTyping && send()}
                  placeholder="Ask a question..."
                  disabled={isTyping}
                  className="flex-1 text-sm text-[#0A0A0A] bg-transparent outline-none placeholder:text-[#0A0A0A]/40 disabled:opacity-50"
                />
                <button
                  onClick={send}
                  disabled={isTyping || !input.trim()}
                  className="text-[#0818A8] hover:scale-110 transition-transform disabled:opacity-30 disabled:hover:scale-100"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.08, boxShadow: '0 12px 40px rgba(8,24,168,0.45)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#0818A8] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(8,24,168,0.4)]"
        aria-label="Open AI chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}