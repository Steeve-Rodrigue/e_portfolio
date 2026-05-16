'use client'

import { useLang } from '@/lib/language-context'

export function SkillsHero() {
  const { t } = useLang()
  return (
    <section style={{ marginBottom: '1.5rem' }}>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p
            className="font-grotesk text-xs md:text-sm font-bold tracking-widest uppercase mb-3"
            style={{ color: '#ff6a00' }}
          >
            {t('skills.profil_technique')}
          </p>
          <h1
            className="font-grotesk font-extrabold uppercase text-4xl md:text-6xl xl:text-[62px]"
            style={{ letterSpacing: '-0.03em', color: '#070707', lineHeight: 0.9 }}
          >
            EXPERTISE
          </h1>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: 'linear-gradient(to right, #ff6a00, rgba(255,106,0,0.1))',
          marginTop: 32,
        }}
      />
    </section>
  )
}
