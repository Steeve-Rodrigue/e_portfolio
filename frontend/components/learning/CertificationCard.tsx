import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import type { Certification } from '@/lib/types'

export function CertificationCard({ cert }: { cert: Certification }) {
  const content = (
    <div
      className="relative flex flex-col gap-3 rounded-[14px] p-5 bg-white/75 border border-[rgba(255,106,0,0.12)] h-full transition-shadow hover:shadow-md"
      style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.04), 0 0 0 1px rgba(255,255,255,0.8) inset' }}
    >
      {cert.url && <ExternalLink className="absolute top-4 right-4 w-3.5 h-3.5 text-[#aaa]" />}

      {cert.badge_url && (
        <div className="w-14 h-14 rounded-[10px] overflow-hidden shrink-0 bg-[#f2ecf4]">
          <Image
            src={cert.badge_url}
            alt={cert.name}
            width={56}
            height={56}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <p className="font-grotesk font-bold text-sm md:text-base xl:text-lg leading-snug text-[#1d1b20]">
          {cert.name}
        </p>
        <p className="font-grotesk font-bold tracking-widest uppercase text-[10px] md:text-xs text-[#ff6a00]">
          {cert.issuer}
        </p>
        {cert.issued_at && (
          <p className="font-grotesk text-[10px] md:text-xs text-[#aaa] mt-1">
            {new Date(cert.issued_at).toLocaleDateString('fr-FR', {
              month: 'long',
              year: 'numeric',
            })}
          </p>
        )}
      </div>
    </div>
  )

  return cert.url ? (
    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      {content}
    </a>
  ) : (
    <div className="h-full">{content}</div>
  )
}
