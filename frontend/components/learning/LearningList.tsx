'use client'

import { ExternalLink } from 'lucide-react'
import { useLang } from '@/lib/language-context'
import type { LearningItem } from '@/lib/types'

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <span className="font-grotesk font-bold tracking-widest uppercase text-xs md:text-sm text-[#ff6a00] shrink-0">
        {label}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(to right, rgba(255,106,0,0.4), transparent)' }}
      />
    </div>
  )
}

function ItemRow({ item }: { item: LearningItem }) {
  const isCompleted =
    item.status != null &&
    ['completed', 'terminé', 'done', 'fini'].includes(item.status.toLowerCase())
  const isFullProgress = item.progress_pct === 100

  return (
    <div className="flex items-start gap-3 py-3 border-b border-[rgba(0,0,0,0.05)] last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-grotesk text-sm md:text-base text-[#1d1b20] font-medium">
            {item.title}
          </span>
          {item.source && (
            <span className="font-grotesk text-[10px] md:text-xs px-2 py-0.5 rounded-md bg-[rgba(255,106,0,0.08)] text-[#ff6a00] border border-[rgba(255,106,0,0.2)] shrink-0">
              {item.source}
            </span>
          )}
          {item.status && (
            <span
              className={`font-grotesk text-[10px] md:text-xs px-2 py-0.5 rounded-md shrink-0 ${
                isCompleted
                  ? 'bg-[rgba(34,197,94,0.1)] text-[#16a34a] border border-[rgba(34,197,94,0.25)]'
                  : 'bg-[rgba(0,0,0,0.05)] text-[#7a7582] border border-[rgba(0,0,0,0.08)]'
              }`}
            >
              {item.status}
            </span>
          )}
        </div>

        {item.type === 'current' && item.progress_pct != null && (
          <div className="mt-2 flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-[rgba(0,0,0,0.07)]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${item.progress_pct}%`,
                  background: isFullProgress ? '#16a34a' : '#ff6a00',
                }}
              />
            </div>
            <span
              className="font-grotesk text-[10px] md:text-xs shrink-0"
              style={{ color: isFullProgress ? '#16a34a' : '#aaa' }}
            >
              {item.progress_pct}%
            </span>
          </div>
        )}
      </div>

      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[#aaa] hover:text-[#ff6a00] transition-colors mt-0.5"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  )
}

type GroupDef = { type: LearningItem['type']; labelKey: string; descKey: string }

const GROUPS: GroupDef[] = [
  { type: 'current', labelKey: 'learning.studies_label', descKey: 'learning.studies_desc' },
  { type: 'course', labelKey: 'learning.completed_label', descKey: 'learning.completed_desc' },
  { type: 'paper', labelKey: 'learning.papers_label', descKey: 'learning.papers_desc' },
  {
    type: 'competition',
    labelKey: 'learning.competitions_label',
    descKey: 'learning.competitions_desc',
  },
]

export function LearningList({
  items,
  only,
  exclude,
}: {
  items: LearningItem[]
  only?: LearningItem['type'][]
  exclude?: LearningItem['type'][]
}) {
  const { t } = useLang()

  const groups = only ? GROUPS.filter((g) => only.includes(g.type)) : GROUPS
  const filtered = exclude ? groups.filter((g) => !exclude.includes(g.type)) : groups
  const grouped = filtered
    .map((g) => ({ ...g, items: items.filter((i) => i.type === g.type) }))
    .filter((g) => g.items.length > 0)

  if (grouped.length === 0) return null

  return (
    <div className="flex flex-col gap-10">
      {grouped.map(({ type, labelKey, descKey, items: groupItems }) => (
        <section key={type}>
          <SectionDivider label={t(labelKey as Parameters<typeof t>[0])} />
          <p className="font-grotesk text-xs md:text-sm text-[#7a7582] mb-4">
            {t(descKey as Parameters<typeof t>[0])}
          </p>
          <div
            className="rounded-[14px] px-4 py-2 bg-white/75 border border-[rgba(255,106,0,0.12)]"
            style={{
              boxShadow: '0 2px 20px rgba(0,0,0,0.04), 0 0 0 1px rgba(255,255,255,0.8) inset',
            }}
          >
            {groupItems.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
