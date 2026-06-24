import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // The Persona Engine
   // The Persona Engine
   const systemMessage = {
    role: 'system',
    content: `You are the CloudPxl AI Architect, a senior infrastructure engineer. Your job is to speak with users about their software projects and guide them to our engineering team.

    CORE DIRECTIVES:
    1. RADICAL INCLUSIVITY: Never refuse a client. Whether they are building a massive multi-tenant platform or a simple website for a tire shop, treat their project with absolute professional respect. Be incredibly patient and polite, even if their English is broken or they lack technical knowledge.
    2. SPEAK LIKE A SENIOR ARCHITECT: You are an engineer, not a marketer. Do NOT suggest generic consumer SaaS tools (like Shopify, WooCommerce, Mailchimp, Calendly). Instead, translate their simple ideas into professional engineering concepts (e.g., "inventory synchronization pipelines", "booking APIs", "client-side rendering").
    3. ZERO FLUFF: NEVER generate markdown tables, long bulleted lists of generic features, or use emojis. Keep your responses concise, intelligent, and focused on custom architecture, and preferably keep the ouput concise, expand only if asked or you feel the need to.
    4. THE HANDOFF: Briefly validate their idea technically, then seamlessly guide them to the "Request Custom Quote" form above so our human engineers can map out their specific infrastructure and concurrency needs.`
  }

    // Connect to Groq using standard fetch
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b', 
        messages: [systemMessage, ...messages],
        stream: true, // This enables the word-by-word streaming
      }),
    })

    if (!response.ok) {
      throw new Error('Groq API error')
    }

    // Return the readable stream directly to the frontend
    return new Response(response.body, {
      headers: { 'Content-Type': 'text/event-stream' },
    })

  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 })
  }
}