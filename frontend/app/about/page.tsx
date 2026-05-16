import type { Metadata } from 'next'
import { getProfile, getExperience } from '@/lib/api'
import { AboutContent } from '@/components/about/AboutContent'

export const metadata: Metadata = {
  title: 'About',
}

export default async function AboutPage() {
  const [profile, experiences] = await Promise.all([getProfile(), getExperience()])

  return (
    <div style={{ background: '#fafaf9', minHeight: '100vh', color: '#1d1b20' }}>
      <main
        style={{
          paddingTop: 40,
          paddingBottom: 80,
          paddingLeft: 'clamp(16px, 5vw, 80px)',
          paddingRight: 'clamp(16px, 5vw, 80px)',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <AboutContent profile={profile} experiences={experiences} />
      </main>
    </div>
  )
}
