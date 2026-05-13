import type { Skill } from '@/lib/types'
import { MasteryDots } from './MasteryDots'

export function SkillItem({ skill }: { skill: Skill }) {
  const opacity = skill.mastery_level === 5 ? 1 : skill.mastery_level === 4 ? 0.85 : 0.65
  return (
    <div className="flex flex-col items-center px-2 py-3 md:py-4 rounded-[10px] transition-[background,transform] duration-200 hover:bg-[rgba(255,106,0,0.06)] hover:-translate-y-[3px] cursor-default">
      <div className="h-11 flex items-center justify-center">
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
      <span
        className="font-grotesk font-semibold text-center mt-2.5 leading-[1.3] max-w-[84px] text-[11px] md:text-xs xl:text-sm"
        style={{ color: '#494551' }}
      >
        {skill.name}
      </span>
      <MasteryDots level={skill.mastery_level} />
    </div>
  )
}
