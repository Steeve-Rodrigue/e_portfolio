'use client'

import { useLang } from '@/lib/language-context'
import { SkillsHero } from '@/components/skills/SkillsHero'
import { ClusterSection } from '@/components/skills/ClusterSection'
import type { Skill } from '@/lib/types'

export function SkillsContent({ skills }: { skills: Skill[] }) {
  const { t } = useLang()

  const clusters = Array.from(new Set(skills.map((s) => s.cluster)))
  const byCluster = (cluster: string) => skills.filter((s) => s.cluster === cluster)

  return (
    <>
      <SkillsHero />

      {clusters.map((cluster, index) => (
        <ClusterSection key={cluster} cluster={cluster} skills={byCluster(cluster)} index={index} />
      ))}

      <div className="flex flex-col items-center gap-6 mt-16">
        <div className="flex gap-10">
          {[
            [String(skills.length), t('skills.count_label')],
            [String(clusters.length), t('skills.domains_label')],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <div
                className="font-grotesk font-extrabold leading-none text-2xl md:text-3xl xl:text-4xl"
                style={{ color: '#ff6a00' }}
              >
                {n}
              </div>
              <div
                className="font-grotesk font-bold tracking-widest uppercase mt-1 text-[10px] md:text-xs xl:text-sm"
                style={{ color: '#aaa' }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
        <p
          className="font-grotesk text-xs md:text-sm italic leading-relaxed text-center"
          style={{ color: '#7a7582' }}
        >
          {t('skills.catalogue')}
        </p>
      </div>
    </>
  )
}
