'use client'

import { useLang } from '@/lib/language-context'
import { useTranslateArray } from '@/lib/use-translate'
import { LearningHero } from '@/components/learning/LearningHero'
import { LearningList } from '@/components/learning/LearningList'
import { CertificationCard } from '@/components/learning/CertificationCard'
import type { LearningItem, Certification } from '@/lib/types'

const ITEM_FIELDS = ['title', 'source'] as const

export function LearningContent({
  certifications,
  learningItems,
}: {
  certifications: Certification[]
  learningItems: LearningItem[]
}) {
  const { t } = useLang()

  const translatedItems = useTranslateArray(learningItems, [...ITEM_FIELDS])

  return (
    <>
      <LearningHero />

      {translatedItems.length > 0 && (
        <section className="mb-16">
          <LearningList items={translatedItems} />
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-grotesk font-bold tracking-widest uppercase text-xs md:text-sm text-[#ff6a00] shrink-0">
              {t('learning.certifications')}
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background: 'linear-gradient(to right, rgba(255,106,0,0.4), transparent)',
              }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <CertificationCard key={cert.id} cert={cert} />
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-col items-center gap-6 mt-16">
        <div className="flex gap-10">
          {[
            [String(certifications.length), t('learning.certs_label')],
            [String(learningItems.length), t('learning.resources_label')],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="font-grotesk font-extrabold leading-none text-2xl md:text-3xl xl:text-4xl text-[#ff6a00]">
                {n}
              </div>
              <div className="font-grotesk font-bold tracking-widest uppercase mt-1 text-[10px] md:text-xs xl:text-sm text-[#aaa]">
                {l}
              </div>
            </div>
          ))}
        </div>
        <p className="font-grotesk text-xs md:text-sm italic leading-relaxed text-center text-[#7a7582]">
          {t('learning.catalogue')}
        </p>
      </div>
    </>
  )
}
