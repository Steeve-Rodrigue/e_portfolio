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
                  className="font-grotesk font-extrabold leading-none"
                  style={{ fontSize: 'clamp(20px, 4vw, 28px)', color: '#ff6a00' }}
                >
                  {n}
                </div>
                <div
                  className="font-grotesk font-bold tracking-widest uppercase mt-1"
                  style={{ fontSize: 10, color: '#aaa' }}
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

      <style>{`
        .cluster-section { margin-bottom: 4.5rem; }
        .cluster-header { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px; }
        .cluster-num { font-size: 13px; font-weight: 800; color: rgba(255,106,0,0.35); letter-spacing: 0.05em; padding-top: 2px; flex-shrink: 0; width: 28px; }
        .skills-card { background: rgba(255,255,255,0.75); border: 1px solid rgba(255,106,0,0.12); border-radius: 14px; padding: 28px 32px; box-shadow: 0 2px 20px rgba(0,0,0,0.04), 0 0 0 1px rgba(255,255,255,0.8) inset; backdrop-filter: blur(8px); margin-left: 48px; }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 8px; }
        .skill-item { display: flex; flex-direction: column; align-items: center; padding: 16px 8px 14px; border-radius: 10px; transition: background 0.2s, transform 0.2s; cursor: default; }
        .skill-item:hover { background: rgba(255,106,0,0.06); transform: translateY(-3px); }
        .skill-icon-wrap { height: 44px; display: flex; align-items: center; justify-content: center; }
        .skill-name { font-size: 12px; font-weight: 600; color: #494551; text-align: center; margin-top: 10px; line-height: 1.3; max-width: 84px; }
        @media (max-width: 849px) {
          .skills-card { margin-left: 0; padding: 16px 12px; }
          .cluster-num { display: none; }
          .skills-grid { grid-template-columns: repeat(auto-fill, minmax(72px, 1fr)); gap: 4px; }
          .skill-item { padding: 10px 4px 8px; }
          .skill-name { font-size: 11px; }
          .cluster-section { margin-bottom: 3rem; }
        }
      `}</style>
    </div>
  )
}
