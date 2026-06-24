'use client'

import dynamic from 'next/dynamic'

const Cursor = dynamic(() => import('@/components/cursor'), { ssr: false })
const ScrollProgress = dynamic(() => import('@/components/scroll-progress'), { ssr: false })

export default function ClientOverlays() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
    </>
  )
}
