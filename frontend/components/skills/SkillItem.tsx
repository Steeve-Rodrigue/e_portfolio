import type { Skill } from '@/lib/types'
import { MasteryDots } from './MasteryDots'

export function SkillItem({ skill }: { skill: Skill }) {
  const opacity = skill.mastery_level === 5 ? 1 : skill.mastery_level === 4 ? 0.85 : 0.65
  return (
    <div className="skill-item">
      <div className="skill-icon-wrap">
        {skill.icon_devicon ? (
          <i
            className={`${skill.icon_devicon} colored`}
            style={{ fontSize: 40, opacity, display: 'block' }}
          />
        ) : (
          <span
            className="inline-flex items-center justify-center rounded-lg font-bold font-grotesk text-sm"
            style={{
              width: 40,
              height: 40,
              background: 'rgba(255,106,0,0.1)',
              color: '#ff6a00',
              opacity,
            }}
          >
            {skill.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <span className="skill-name font-grotesk">{skill.name}</span>
      <MasteryDots level={skill.mastery_level} />
    </div>
  )
}
