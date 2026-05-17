'use client'

import Link from 'next/link'
import { Network } from 'lucide-react'
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'
import { useLang } from '@/lib/language-context'
import { useTranslateFields } from '@/lib/use-translate'
import type { Profile } from '@/lib/types'

const PROFILE_FIELDS = ['title', 'tagline'] as const

export function Footer({ profile }: { profile: Profile }) {
  const { t } = useLang()

  const p = useTranslateFields(profile, [...PROFILE_FIELDS])

  const directory = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.projects'), href: '/projects' },
    { label: t('nav.skills'), href: '/skills' },
    { label: t('nav.learning'), href: '/learning' },
    { label: t('nav.about'), href: '/about' },
  ]

  const connect = [
    profile.github_url && { label: 'GitHub', href: profile.github_url, icon: FaGithub },
    profile.linkedin_url && { label: 'LinkedIn', href: profile.linkedin_url, icon: FaLinkedinIn },
    profile.email && { label: 'Email', href: `mailto:${profile.email}`, icon: FaEnvelope },
  ].filter(Boolean) as { label: string; href: string; icon: React.ElementType }[]

  return (
    <footer className="bg-[#2D3648] text-white border-t-2 border-orange">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5 px-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Network className="w-6 h-6 text-orange" strokeWidth={2} />
              <span className="text-xl font-bold text-white font-grotesk">{profile.name}</span>
            </div>
            <p className="text-xs uppercase tracking-widest text-orange font-semibold mb-4">
              {p.title}
            </p>
            <p className="text-sm leading-relaxed text-white/70 max-w-xs">{p.tagline}</p>
          </div>

          <div className="flex flex-col items-center md:col-span-2">
            <div className="mb-6">
              <h4 className="text-white font-bold tracking-widest text-xs uppercase font-grotesk">
                {t('footer.directory')}
              </h4>
              <div className="mt-2 w-6 h-0.5 bg-orange rounded-full" />
            </div>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {directory.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-orange transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:col-span-1">
            <div className="mb-6">
              <h4 className="text-white font-bold tracking-widest text-xs uppercase font-grotesk">
                {t('footer.connect')}
              </h4>
              <div className="mt-2 w-6 h-0.5 bg-orange rounded-full" />
            </div>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {connect.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 text-white/70 hover:text-orange transition-colors group"
                  >
                    <item.icon className="w-4 h-4 text-orange/60 group-hover:text-orange transition-colors" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/40 tracking-widest uppercase">
            © {new Date().getFullYear()} .4 {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
