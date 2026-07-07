import HeroSection from '@/components/offer-hero'
import PricingSection from '@/components/offer-pricing'
import AddonsSection from '@/components/offer-addons'
import HowWeWork from '@/components/offer-how-we-work'
import ContactSection from '@/components/offer-contact'
import Footer from '@/components/offer-footer'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PricingSection />
      <AddonsSection />
      <HowWeWork />
      <ContactSection />
      <Footer />
    </main>
  )
}