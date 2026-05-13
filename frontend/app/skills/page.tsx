import type { Metadata } from 'next'
import { getSkills } from '@/lib/api'
import { SkillsHero } from '@/components/skills/SkillsHero'
import { ClusterSection } from '@/components/skills/ClusterSection'

export const metadata: Metadata = {
  title: 'Expertise & Compétences',
}

export default async function SkillsPage() {
  const skills = await getSkills()

  const clusters = Array.from(new Set(skills.map((s) => s.cluster)))
  const byCluster = (cluster: string) => skills.filter((s) => s.cluster === cluster)

  return (
    <div
      style={{
        background: '#fafaf9',
        minHeight: '100vh',
        color: '#1d1b20',
        fontFamily: 'var(--font-grotesk)',
      }}
    >
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
      />

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
        <SkillsHero />

        {clusters.map((cluster, index) => (
          <ClusterSection
            key={cluster}
            cluster={cluster}
            skills={byCluster(cluster)}
            index={index}
          />
        ))}

        <div className="flex flex-col items-center gap-6 mt-16">
          <div className="flex gap-10">
            {[
              [String(skills.length), 'compétences'],
              [String(clusters.length), 'domaines'],
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
            catalogue de compétences techniques développées à travers la recherche et les projets.
          </p>
        </div>
      </main>
    </div>
  )
}
