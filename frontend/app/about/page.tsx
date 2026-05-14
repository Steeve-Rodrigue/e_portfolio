import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getProfile, getExperience } from '@/lib/api'
import { AboutHero } from '@/components/about/AboutHero'
import { Timeline } from '@/components/about/Timeline'

export const metadata: Metadata = {
  title: 'About',
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-grotesk font-bold tracking-widest uppercase text-xs md:text-sm text-[#ff6a00] shrink-0">
        {label}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(to right, rgba(255,106,0,0.4), transparent)' }}
      />
    </div>
  )
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
        <AboutHero profile={profile} />
        <Timeline experiences={experiences} />

        {/* Compétences */}
        <section className="mb-16">
          <SectionDivider label="Compétences" />
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-grotesk border border-[#ddd] text-[#494551] transition-colors hover:text-[#ff6a00] hover:border-[#ff6a00]"
          >
            Voir toutes les compétences
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>

        {/* Projets */}
        <section className="mb-16">
          <SectionDivider label="Projets" />
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-grotesk border border-[#ddd] text-[#494551] transition-colors hover:text-[#ff6a00] hover:border-[#ff6a00]"
          >
            Voir tous les projets
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </main>
    </div>
  )
}
