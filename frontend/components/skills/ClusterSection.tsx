'use client'

import { useLang } from '@/lib/language-context'
import type { Skill } from '@/lib/types'
import { SkillItem } from './SkillItem'

export function ClusterSection({
  cluster,
  skills,
  index,
}: {
  cluster: string
  skills: Skill[]
  index: number
}) {
  const { t } = useLang()
  const sorted = [...skills].sort((a, b) => a.display_order - b.display_order)
  const num = String(index + 1).padStart(2, '0')
  const categories = Array.from(new Set(skills.map((s) => s.category))).join(' · ')

  return (
    <section className="mb-12 md:mb-16">
      <div className="flex items-start gap-5 mb-5">
        <span
          className="hidden md:inline-block font-grotesk font-extrabold shrink-0 w-7 pt-0.5 text-xs md:text-sm"
          style={{ color: 'rgba(255,106,0,0.35)', letterSpacing: '0.05em' }}
        >
          {num}
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <span
              className="font-grotesk font-bold tracking-widest uppercase text-white text-xs md:text-sm px-3 py-1 rounded-md"
              style={{ background: '#ff6a00' }}
            >
              {cluster}
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(to right, rgba(255,106,0,0.4), transparent)' }}
            />
            <span
              className="font-grotesk text-xs md:text-sm"
              style={{ color: '#aaa', letterSpacing: '0.08em' }}
            >
              {sorted.length} {t('skills.count_label')}
            </span>
          </div>
          {categories && (
            <p
              className="text-sm md:text-base xl:text-lg"
              style={{ color: '#1d1b20', letterSpacing: '0.04em' }}
            >
              {categories}
            </p>
          )}
        </div>
      </div>

      <div
        className="bg-white/75 border border-[rgba(255,106,0,0.12)] rounded-[14px] px-3 py-4 md:ml-12 md:px-8 md:py-7 backdrop-blur-sm"
        style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.04), 0 0 0 1px rgba(255,255,255,0.8) inset' }}
      >
        <div className="grid gap-1 md:gap-12 [grid-template-columns:repeat(auto-fill,minmax(72px,1fr))] md:[grid-template-columns:repeat(auto-fill,minmax(90px,1fr))]">
          {sorted.map((skill) => (
            <SkillItem key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}
