import Image from 'next/image'
import { MapPin, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import type { Profile } from '@/lib/types'

export function AboutHero({ profile }: { profile: Profile }) {
  return (
    <section className="mb-16 flex flex-col md:flex-row gap-10 items-start">
      {profile.calendly_url && (
        <div className="shrink-0 flex items-center gap-4 md:block">
          <Image
            src={profile.calendly_url}
            alt={profile.name}
            width={160}
            height={160}
            className="rounded-[20px] object-cover w-24 h-24 md:w-40 md:h-40"
          />
          {/* Name shown inline with photo on mobile only */}
          <div className="md:hidden">
            <h1
              className="font-grotesk font-extrabold uppercase text-2xl text-[#070707] leading-none mb-1"
              style={{ letterSpacing: '-0.03em' }}
            >
              {profile.name}
            </h1>
            <p className="font-grotesk font-semibold text-xs text-[#ff6a00] uppercase tracking-widest">
              {profile.title}
            </p>
          </div>
        </div>
      )}

      <div className="flex-1">
        {profile.is_open_to_work && (
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
            <span className="font-grotesk text-xs font-semibold text-[#16a34a] tracking-widest uppercase">
              {profile.availability_status ?? 'Open to work'}
            </span>
          </div>
        )}

        {/* Name shown below badge on desktop only */}
        <h1
          className="hidden md:block font-grotesk font-extrabold uppercase text-4xl md:text-6xl xl:text-[62px] text-[#070707] leading-none mb-3"
          style={{ letterSpacing: '-0.03em' }}
        >
          {profile.name}
        </h1>

        <p className="hidden md:block font-grotesk font-semibold text-sm md:text-base text-[#ff6a00] uppercase tracking-widest mb-4">
          {profile.title}
        </p>

        {profile.tagline && (
          <p className="font-grotesk text-sm md:text-base xl:text-lg text-[#444444] leading-relaxed mb-6 max-w-xl">
            {profile.tagline}
          </p>
        )}

        {profile.location && (
          <div className="flex items-center gap-1.5 font-grotesk text-xs md:text-sm text-[#7a7582] mb-6">
            <MapPin className="w-3.5 h-3.5" />
            {profile.location}
          </div>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          {profile.github_url && (
            <a
              href={profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-grotesk border border-[#ddd] text-[#494551] transition-colors hover:text-[#ff6a00] hover:border-[#ff6a00]"
            >
              <FaGithub className="w-4 h-4" />
              GitHub
            </a>
          )}
          {profile.linkedin_url && (
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-grotesk border border-[#ddd] text-[#494551] transition-colors hover:text-[#ff6a00] hover:border-[#ff6a00]"
            >
              <FaLinkedin className="w-4 h-4" />
              LinkedIn
            </a>
          )}
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-grotesk border border-[#ddd] text-[#494551] transition-colors hover:text-[#ff6a00] hover:border-[#ff6a00]"
            >
              <Mail className="w-3.5 h-3.5" />
              Email
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
