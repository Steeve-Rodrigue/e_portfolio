'use client'

import { useLang } from '@/lib/language-context'
import { useTranslateArray } from '@/lib/use-translate'
import { ProjectsHero } from '@/components/projects/ProjectsHero'
import { ProjectCard } from '@/components/projects/ProjectCard'
import type { Project } from '@/lib/types'

const FIELDS = ['title', 'problem_statement', 'methodology', 'results_impact'] as const

export function ProjectsContent({ projects }: { projects: Project[] }) {
  const { t } = useLang()
  const translated = useTranslateArray(
    projects as unknown as Record<string, unknown>[],
    FIELDS as unknown as string[]
  ) as unknown as Project[]

  const featured = projects.filter((p) => p.featured).length

  return (
    <>
      <ProjectsHero />

      {translated.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}

      <div className="flex flex-col items-center gap-6 mt-16">
        <div className="flex gap-10">
          {[
            [String(projects.length), t('projects.count_label')],
            [String(featured), t('projects.featured_label')],
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
          {t('projects.catalogue')}
        </p>
      </div>
    </>
  )
}
