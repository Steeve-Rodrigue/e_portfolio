'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackVisit } from '@/lib/api'

function getDevice(): 'mobile' | 'desktop' {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
}

function getBrowser(): string {
  const ua = navigator.userAgent
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Edg')) return 'Edge'
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Safari')) return 'Safari'
  return 'Other'
}

export function VisitorTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith('/admin')) return
    if (localStorage.getItem('admin_token')) return
    trackVisit({
      page: pathname,
      referrer: document.referrer || null,
      device: getDevice(),
      browser: getBrowser(),
    }).catch(() => {})
  }, [pathname])

  return null
}
