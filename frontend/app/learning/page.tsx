import type { Metadata } from 'next'
import { getCertifications, getLearning } from '@/lib/server-api'
import { LearningContent } from '@/components/learning/LearningContent'

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
        <LearningContent certifications={certifications} learningItems={learningItems} />
      </main>
    </div>
  )
}
