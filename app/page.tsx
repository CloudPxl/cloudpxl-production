import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Capabilities from '@/components/capabilities'
import Infrastructure from '@/components/infrastructure'
import OurWork from '@/components/our-work'
import Workflows from '@/components/workflows'
import Compliance from '@/components/compliance'
import Quote from '@/components/quote'
import Footer from '@/components/footer'
import Chatbot from '@/components/chatbot'
import ClientOverlays from '@/components/client-overlays'

export default function Page() {
  return (
    <>
      <ClientOverlays />
      <main className="relative overflow-x-hidden bg-[#F7F7F3]">
        <Navbar />
        <Hero />
        <Capabilities />
        <Infrastructure />
        <OurWork />
        <Workflows />
        <Compliance />
        <Quote />
        <Footer />
        <Chatbot />
      </main>
    </>
  )
}
