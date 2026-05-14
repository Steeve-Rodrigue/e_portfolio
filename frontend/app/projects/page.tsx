import type { Metadata } from 'next'
import { getProjects } from '@/lib/api'
import { ProjectsHero } from '@/components/projects/ProjectsHero'
import { ProjectCard } from '@/components/projects/ProjectCard'

export const metadata: Metadata = {
  title: 'Projets',
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const sorted = [...projects].sort((a, b) => a.display_order - b.display_order)
  const featured = projects.filter((p) => p.featured).length

  return (
    <div
      style={{
        background: '#fafaf9',
        minHeight: '100vh',
        color: '#1d1b20',
        fontFamily: 'var(--font-grotesk)',
      }}
    >
      <main
        style={{
          paddingTop: 40,
          paddingBottom: 80,
          paddingLeft: 'clamp(16px, 5vw, 80px)',
          paddingRight: 'clamp(16px, 5vw, 80px)',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <ProjectsHero />

        {sorted.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}

        <div className="flex flex-col items-center gap-6 mt-16">
          <div className="flex gap-10">
            {[
              [String(sorted.length), 'projets'],
              [String(featured), 'featured'],
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
            catalogue de projets data développés à travers la recherche et l&apos;expérience.
          </p>
        </div>
      </main>
    </div>
  )
}
