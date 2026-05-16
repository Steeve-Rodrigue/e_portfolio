'use client'

import Link from 'next/link'
import { FolderOpen, Download, MapPin } from 'lucide-react'
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'
import { HeroCadran } from '@/components/sections/HeroCadran'
import { splitName } from '@/lib/utils'
import { useLang } from '@/lib/language-context'
import { useTranslateFields } from '@/lib/use-translate'
import type { Profile } from '@/lib/types'

const FIELDS = ['title', 'tagline', 'availability_status'] as const

export function HeroClient({ profile }: { profile: Profile }) {
  const { t } = useLang()
  const p = useTranslateFields(
    profile as Record<string, unknown>,
    FIELDS as unknown as string[]
  ) as unknown as Profile

  const { firstNames, surname } = splitName(p.name)
  const cv = p.social_links?.cv ?? null

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        height: '100%',
        minHeight: 'calc(100vh - 5rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '8%',
        paddingRight: '8%',
      }}
    >
      <div className="flex flex-col gap-4 text-left max-w-[52vw] md:max-w-md xl:max-w-xl">
        {p.is_open_to_work && (
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-grotesk self-start"
            style={{
              background: 'rgba(255,106,0,0.08)',
              border: '1px solid rgba(255,106,0,0.4)',
              color: '#ff6a00',
            }}
          >
            <span
              className="animate-pulse inline-block rounded-full"
              style={{ width: 6, height: 6, background: '#ff6a00', flexShrink: 0 }}
            />
            {p.availability_status}
          </div>
        )}

        <h1
          className="text-3xl md:text-4xl xl:text-5xl tracking-tight leading-tight"
          style={{ color: '#0a0a0a' }}
        >
          <span className="whitespace-nowrap font-bold">{firstNames}</span>
          {surname && (
            <>
              <br />
              <span className="block uppercase font-normal">{surname}</span>
            </>
          )}
        </h1>

        <p
          className="font-kanit text-base md:text-xl xl:text-2xl font-bold tracking-widest uppercase"
          style={{ color: '#ff6a00' }}
        >
          {p.title}
        </p>

        <p
          className="font-grotesk text-sm md:text-base xl:text-lg leading-relaxed mt-2"
          style={{ color: '#444444' }}
        >
          {p.tagline}
        </p>

        {p.location && (
          <div className="flex items-center gap-2 mt-2" style={{ color: '#444444' }}>
            <MapPin className="w-4 h-4 shrink-0" style={{ color: '#ff6a00' }} />
            <span className="text-xs md:text-sm xl:text-base tracking-wide font-grotesk">
              {p.location}
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 px-4 py-2 md:px-8 md:py-3 rounded-full text-xs md:text-sm tracking-widest uppercase transition-colors font-grotesk text-white hover:opacity-90"
            style={{ background: '#ff6a00', border: '1px solid #ff6a00' }}
          >
            <FolderOpen className="w-3.5 h-3.5 md:w-4 md:h-4" />
            {t('hero.view_projects')}
          </Link>

          {cv && (
            <a
              href={cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 md:px-8 md:py-3 rounded-full text-xs md:text-sm tracking-widest uppercase transition-colors font-grotesk hover:text-[#ff6a00] hover:border-[#ff6a00]"
              style={{ border: '1px solid #0a0a0a', color: '#0a0a0a' }}
            >
              <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
              {t('hero.download_cv')}
            </a>
          )}

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="text-xs font-grotesk" style={{ color: '#888888' }}>
              {t('hero.contact_here')}
            </span>
            <div className="flex items-center gap-5">
              {p.email && (
                <a
                  href={`mailto:${p.email}`}
                  className="text-[#444444] transition-colors hover:text-[#ff6a00]"
                >
                  <FaEnvelope className="w-4 h-4" />
                </a>
              )}
              {p.linkedin_url && (
                <a
                  href={p.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#444444] transition-colors hover:text-[#ff6a00]"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
              )}
              {p.github_url && (
                <a
                  href={p.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#444444] transition-colors hover:text-[#ff6a00]"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="[@media(max-width:600px)]:hidden flex items-center justify-center">
        <HeroCadran photoUrl={profile.calendly_url} />
      </div>
    </div>
  )
}
