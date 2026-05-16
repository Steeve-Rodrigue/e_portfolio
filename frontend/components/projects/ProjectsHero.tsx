'use client'

import { useLang } from '@/lib/language-context'

export function ProjectsHero() {
  const { t } = useLang()
  return (
    <section style={{ marginBottom: '1.5rem' }}>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1
            className="font-grotesk font-extrabold uppercase text-4xl md:text-6xl xl:text-[62px]"
            style={{ letterSpacing: '-0.03em', color: '#070707', lineHeight: 0.9 }}
          >
            {t('projects.hero_title')}
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
