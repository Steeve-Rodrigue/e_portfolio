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
  const sorted = [...skills].sort((a, b) => a.display_order - b.display_order)
  const num = String(index + 1).padStart(2, '0')
  const categories = Array.from(new Set(skills.map((s) => s.category))).join(' · ')

  return (
    <section className="cluster-section">
      <div className="cluster-header">
        <span className="cluster-num font-grotesk">{num}</span>
        <div style={{ flex: 1 }}>
          <div className="flex items-center gap-3 mb-1">
            <span
              className="font-grotesk text-xs font-bold tracking-widest uppercase text-white px-3 py-1 rounded-md"
              style={{ background: '#ff6a00' }}
            >
              {cluster}
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: 'linear-gradient(to right, rgba(255,106,0,0.4), transparent)',
              }}
            />
            <span
              className="font-grotesk text-xs"
              style={{ color: '#aaa', letterSpacing: '0.08em' }}
            >
              {sorted.length} compétences
            </span>
          </div>
          {categories && (
            <p
              className="font-grotesk text-sm"
              style={{ color: '#1d1b20', letterSpacing: '0.04em' }}
            >
              {categories}
            </p>
          )}
        </div>
      </div>

      <div className="skills-card">
        <div className="skills-grid">
          {sorted.map((skill) => (
            <SkillItem key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}
