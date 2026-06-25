import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  // SEO Entity Establishment
  title: {
    default: 'CloudPxl | Enterprise Infrastructure & Workflow Scaling',
    template: '%s | CloudPxl'
  },
  description: 'Access your isolated tenant environment. Monitor your battle-tested stack, manage concurrent workflows, and scale your infrastructure with zero ambiguity.',
  keywords: ['CloudPxl', 'Enterprise Architecture', 'Cloud Infrastructure', 'Concurrent Workflows', 'Multi-tenant Scaling'],
  metadataBase: new URL('https://www.cloudpxl.com'),
  
  // Rich Sharing (Social Media / iMessage links)
  openGraph: {
    title: 'CloudPxl | Enterprise Infrastructure & Workflow Scaling',
    description: 'Monitor your battle-tested stack and manage concurrent workflows.',
    url: 'https://www.cloudpxl.com',
    siteName: 'CloudPxl',
    locale: 'en_US',
    type: 'website',
  },
  
  // Crawler Directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Your Original Configuration
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F7F7F3',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} bg-[#F7F7F3]`}>
      <body className="font-sans antialiased bg-[#F7F7F3] text-[#0A0A0A]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
