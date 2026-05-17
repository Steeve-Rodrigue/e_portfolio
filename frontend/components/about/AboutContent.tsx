'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/language-context'
import { useTranslateFields, useTranslateArray } from '@/lib/use-translate'
import { AboutHero } from '@/components/about/AboutHero'
import { Timeline } from '@/components/about/Timeline'
import type { Profile, Experience } from '@/lib/types'

const PROFILE_FIELDS = ['title', 'tagline', 'availability_status'] as const
const EXP_FIELDS = ['role', 'description', 'impact_metric'] as const

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

export function AboutContent({
  profile,
  experiences,
}: {
  profile: Profile
  experiences: Experience[]
}) {
  const { t } = useLang()

  const translatedProfile = useTranslateFields(profile, [...PROFILE_FIELDS])
  const translatedExperiences = useTranslateArray(experiences, [...EXP_FIELDS])

  return (
    <>
      <AboutHero profile={translatedProfile} />
      <Timeline experiences={translatedExperiences} />

      <section className="mb-16">
        <SectionDivider label={t('about.skills_section')} />
        <Link
          href="/skills"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm xl:text-base font-grotesk border border-[#ddd] text-[#494551] transition-colors hover:text-[#ff6a00] hover:border-[#ff6a00]"
        >
          {t('about.skills_link')}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>

      <section className="mb-16">
        <SectionDivider label={t('about.projects_section')} />
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm xl:text-base font-grotesk border border-[#ddd] text-[#494551] transition-colors hover:text-[#ff6a00] hover:border-[#ff6a00]"
        >
          {t('about.projects_link')}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>
    </>
  )
}
