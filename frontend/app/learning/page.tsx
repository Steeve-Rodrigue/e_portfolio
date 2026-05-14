import type { Metadata } from 'next'
import { getCertifications, getLearning } from '@/lib/api'
import { LearningHero } from '@/components/learning/LearningHero'
import { CertificationCard } from '@/components/learning/CertificationCard'
import { LearningList } from '@/components/learning/LearningList'

export const metadata: Metadata = {
  title: 'Learning',
}

export default async function LearningPage() {
  const [certifications, learningItems] = await Promise.all([getCertifications(), getLearning()])

  return (
    <div style={{ background: '#fafaf9', minHeight: '100vh', color: '#1d1b20' }}>
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
        <LearningHero />

        {learningItems.length > 0 && (
          <section className="mb-16">
            <LearningList items={learningItems} />
          </section>
        )}

        {certifications.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-grotesk font-bold tracking-widest uppercase text-xs md:text-sm text-[#ff6a00] shrink-0">
                Certifications
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
              [String(certifications.length), 'certifications'],
              [String(learningItems.length), 'ressources'],
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
            apprentissage continu à travers cours, papers et compétitions.
          </p>
        </div>
      </main>
    </div>
  )
}
