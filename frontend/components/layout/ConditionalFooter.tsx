'use client'

import { usePathname } from 'next/navigation'
import { Footer } from '@/components/layout/Footer'
import type { Profile } from '@/lib/types'

export function ConditionalFooter({ profile }: { profile: Profile }) {
  const pathname = usePathname()
  if (pathname === '/') return null
  return <Footer profile={profile} />
}
