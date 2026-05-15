import Link from 'next/link'
import { FolderOpen, Download, MapPin } from 'lucide-react'
import NeuralNetwork from '@/components/NeuralNetwork'
import { HeroCadran } from '@/components/sections/HeroCadran'
import { getProfile } from '@/lib/api'
import { splitName } from '@/lib/utils'

import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'

export async function Hero() {
  const profile = await getProfile()
  const { firstNames, surname } = splitName(profile.name)
  const {
    title,
    tagline,
    is_open_to_work: isOpenToWork,
    availability_status: availabilityStatus,
    location,
    email,
    linkedin_url: linkedinUrl,
    github_url: githubUrl,
  } = profile
  const cv = profile.social_links?.cv ?? null

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'calc(100vh - 5rem)',
        overflow: 'hidden',
        background: 'linear-gradient(to right, #ffffff 20%, #000000 100%)',
      }}
    >
      {/* Animation */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <NeuralNetwork />
      </div>

      {/* White mask — left side */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, #ffffff 0%, #ffffff 25%, transparent 99%)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
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
          {isOpenToWork && (
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
              {availabilityStatus}
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
            className="font-kanit text-base md:text-xl xl:text-2xl font-bold tracking-widest uppercase font-kanit"
            style={{ color: '#ff6a00' }}
          >
            {title}
          </p>
          <p
            className=" font-grotesk text-sm md:text-base xl:text-lg leading-relaxed mt-2"
            style={{ color: '#444444' }}
          >
            {tagline}
          </p>

          <div className="flex items-center gap-2 mt-2" style={{ color: '#444444' }}>
            <MapPin className="w-4 h-4 shrink-0" style={{ color: '#ff6a00' }} />
            <span className="text-xs md:text-sm xl:text-base tracking-wide font-grotesk">
              {location}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 md:px-8 md:py-3 rounded-full text-xs md:text-sm tracking-widest uppercase transition-colors font-grotesk text-white hover:opacity-90"
              style={{ background: '#ff6a00', border: '1px solid #ff6a00' }}
            >
              <FolderOpen className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Voir les projets
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
                Télécharger CV
              </a>
            )}
            {/* Contact links */}
            <div className="flex flex-wrap items-center gap-3 mt-2 py-b-6">
              <span className="text-xs font-grotesk" style={{ color: '#888888' }}>
                Me contacter ici
              </span>
              <div className="flex items-center gap-5">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="text-[#444444] transition-colors hover:text-[#ff6a00]"
                  >
                    <FaEnvelope className="w-4 h-4" />
                  </a>
                )}
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#444444] transition-colors hover:text-[#ff6a00]"
                  >
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
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

        {/* Photo cadran — hidden below 400px */}
        <div className="[@media(max-width:600px)]:hidden flex items-center justify-center">
          <HeroCadran photoUrl={profile.calendly_url} />
        </div>
      </div>
    </section>
  )
}
